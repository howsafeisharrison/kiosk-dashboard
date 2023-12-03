import PropTypes from 'prop-types';
import { format } from 'date-fns';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import {
  Avatar,
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
import { Scrollbar } from 'src/components/scrollbar';
import DeleteDialog from 'src/components/delete-dialog';
import * as React from 'react';
import CreateDialog from 'src/components/user-create-dialog';

export const UsersTable = (props) => {
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
  const [selectedUser, setUser] = React.useState(null);

  const handleClickDelete = (user) => {
    setUser(user);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setUser(null);
  };

  const handleClickAdd = (user) => {
    setUser(user);
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setUser(null);
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
                  Email
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Gatekeeper ID
                </TableCell>
                <TableCell>
                  Created Date
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((user) => {
                const isSelected = selected.includes(user.id);
                const createdAt = format(new Date(user.created_at), 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={user.id}
                    selected={isSelected}
                  >
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(user.id);
                          } else {
                            onDeselectOne?.(user.id);
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
                        <Avatar src={'/assets/avatars/default.png'}/>
                        <Typography variant="subtitle2">
                          {user.first_name} {user.middle_name} {user.last_name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {user.email}
                    </TableCell>
                    <TableCell>
                      {user.phone}
                    </TableCell>
                    <TableCell>
                      {user.gatekeeper_id}
                    </TableCell>
                    <TableCell>
                      {createdAt}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleClickAdd(user)}>
                        <Icon><PencilIcon/></Icon>
                      </IconButton>
                      <IconButton onClick={() => handleClickDelete(user)}>
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
        type={'User'}
        selectedId={selectedUser?.id}
        description={`${selectedUser?.first_name} ${selectedUser?.last_name}`}
      />
      <CreateDialog
        open={openAdd}
        onClose={handleCloseAdd}
        type={'User'}
        data={selectedUser}
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

UsersTable.propTypes = {
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
