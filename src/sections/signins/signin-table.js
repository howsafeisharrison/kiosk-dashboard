import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Box,
  Card,
  Checkbox,
  Icon,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import { Scrollbar } from 'src/components/scrollbar';
import DeleteDialog from 'src/components/delete-dialog';
import * as React from 'react';
import CreateDialog from 'src/components/user-create-dialog';

export const SigninTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const [openDelete, setOpenDelete] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [selectedSignin, setSignin] = React.useState(null);

  const handleClickDelete = (signin) => {
    setSignin(signin);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSignin(null);
  };

  const handleClickAdd = (signin) => {
    setSignin(signin);
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setSignin(null);
  };

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell> */}
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  User Type
                </TableCell>
                <TableCell>
                  Visiting
                </TableCell>
                <TableCell>
                  Sign In Time
                </TableCell>
                <TableCell>
                  Sign Out TIme
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((visit) => {
                const isSelected = selected.includes(visit.id);
                const signIn = format(new Date(visit.signin_time), 'dd/MM/yyyy - hh:mm:ss a');
                const signOut = format(new Date(visit.signout_time), 'dd/MM/yyyy - hh:mm:ss a');

                return (
                  <TableRow
                    hover
                    key={visit.id}
                    selected={isSelected}
                  >
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(visit.id);
                          } else {
                            onDeselectOne?.(visit.id);
                          }
                        }}
                      />
                    </TableCell> */}
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography variant="subtitle2">
                          {visit.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {visit.userType}
                    </TableCell>
                    <TableCell>
                      {visit.visiting}
                    </TableCell>
                    <TableCell>
                      {signIn}
                    </TableCell>
                    <TableCell>
                      {signOut}
                    </TableCell>
                    <TableCell>
                      {visit.signout_type ? visit.signout_type : 'On-site'}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleClickAdd(visit)}>
                        <Icon><PencilIcon/></Icon>
                      </IconButton>
                      <IconButton onClick={() => handleClickDelete(visit)}>
                        <Icon color='error'><TrashIcon/></Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <DeleteDialog
        open={openDelete}
        onClose={handleCloseDelete}
        type={'SignIn'}
        selectedId={selectedSignin?.id}
        description={`the visit by ${selectedSignin?.name} at ${selectedSignin ? format(new Date(selectedSignin.signin_time), 'dd/MM/yyyy, hh:mm:ss a') : ''}`}
      />
      <CreateDialog
        open={openAdd}
        onClose={handleCloseAdd}
        type={'SignIn'}
        data={selectedSignin}
      />
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

SigninTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
