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
import { UsersTable } from "src/sections/user/users-table";
import { UsersSearch } from "src/sections/user/users-search";
import { applyPagination } from "src/utils/apply-pagination";
import useAlerts from "src/hooks/useAlerts";

const usePaginatedAlerts = (data, page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [data, page, rowsPerPage]);
};

const useAlertIds = (alerts) => {
  return useMemo(() => {
    return alerts?.map((alert) => alert.id);
  }, [alerts]);
};

const Page = () => {
  const { alerts, isError, isLoading } = useAlerts();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const paginatedAlerts = usePaginatedAlerts(alerts, page, rowsPerPage);
  const alertIds = useAlertIds(alerts);
  const alertSelection = useSelection(alertIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Site Alerts | Gatekeeper</title>
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
                <Typography variant="h4">Users</Typography>
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
            {/* <UsersSearch /> */}
            {/* {isLoading ? (
              <CircularProgress />
            ) : (
              <AlertsTable
                count={alerts.length}
                items={paginatedAlerts}
                onDeselectAll={alertSelection.handleDeselectAll}
                onDeselectOne={alertSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={alertSelection.handleSelectAll}
                onSelectOne={alertSelection.handleSelectOne}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={alertSelection.selected}
              />
            )} */}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
