import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { SigninTable } from "src/sections/signins/signin-table";
import { SigninSearch } from "src/sections/signins/signin-search";
import { applyPagination } from "src/utils/apply-pagination";
import useVisits from "src/hooks/useVisits";

const usePaginatedVisits = (data, page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [data, page, rowsPerPage]);
};

const useVisitIds = (visits) => {
  return useMemo(() => {
    return visits?.map((visit) => visit.id);
  }, [visits]);
};

const Page = () => {
  const { visits, isError, isLoading } = useVisits();
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const paginatedVisits = usePaginatedVisits(visits, page, rowsPerPage);
  const visitIds = useVisitIds(visits);
  const visitSelection = useSelection(visitIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);
  
  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Sign Ins | Gatekeeper</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Sign Ins</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowPathIcon />
                      </SvgIcon>
                    }
                  >
                    Refresh
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <SigninSearch />
            {isLoading ? (
              <CircularProgress />
            ) : (
              <SigninTable
                count={visits.length}
                items={paginatedVisits}
                onDeselectAll={visitSelection.handleDeselectAll}
                onDeselectOne={visitSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={visitSelection.handleSelectAll}
                onSelectOne={visitSelection.handleSelectOne}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={visitSelection.selected}
                load={isLoading}
              />
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
