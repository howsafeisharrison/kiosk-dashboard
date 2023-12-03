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
import useUsers from "src/hooks/useUsers";
import CreateDialog from "src/components/user-create-dialog";

const usePaginatedUsers = (data, page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [data, page, rowsPerPage]);
};

const useUserIds = (users) => {
  return useMemo(() => {
    return users?.map((user) => user.id);
  }, [users]);
};

const Page = () => {
  const { users, isError, isLoading } = useUsers();

  const [openAdd, setOpenAdd] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const paginatedUsers = usePaginatedUsers(users, page, rowsPerPage);
  const userIds = useUserIds(users);
  const userSelection = useSelection(userIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleClickAdd = () => {
    console.log('hey');
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  return (
    <>
      <Head>
        <title>Users | Gatekeeper</title>
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
                    onClick={() => window.location.reload(false)}
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
                  onClick={() => handleClickAdd()}
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
            <UsersSearch />
            {isLoading ? (
              <CircularProgress />
            ) : (
              <UsersTable
                count={users.length}
                items={paginatedUsers}
                onDeselectAll={userSelection.handleDeselectAll}
                onDeselectOne={userSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={userSelection.handleSelectAll}
                onSelectOne={userSelection.handleSelectOne}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={userSelection.selected}
              />
            )}
          </Stack>
        </Container>
      </Box>
      <CreateDialog
        open={openAdd}
        onClose={handleCloseAdd}
        type={'User'}
      />
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
