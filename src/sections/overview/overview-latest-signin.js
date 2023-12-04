import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';

const statusMap = {
  'onsite': 'warning',
  'kiosk-checkout': 'success',
  'qrcode-checkout': 'success',
  'general-expired': 'error'
};

export const OverviewLatestSignin = (props) => {
  const { data = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Sign Ins" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Visitor
                </TableCell>
                <TableCell>
                  User Type
                </TableCell>
                <TableCell sortDirection="desc">
                  Sign in time
                </TableCell>
                <TableCell>
                  Sign out time
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((v) => {
                const signIn = format(new Date(v.signin_time), 'dd/MM/yyyy - hh:mm:ss a');
                const signOut = v.signout_time ? format(new Date(v.signout_time), 'dd/MM/yyyy - hh:mm:ss a') : '';
                
                return (
                  <TableRow
                    hover
                    key={v.id}
                  >
                    <TableCell>
                      {v.name}
                    </TableCell>
                    <TableCell>
                      {v.userType}
                    </TableCell>
                    <TableCell>
                      {signIn}
                    </TableCell>
                    <TableCell>
                      {signOut}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[v.signout_type ?? 'onsite']}>
                        {v.signout_type ?? 'onsite'}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestSignin.prototype = {
  data: PropTypes.array,
  sx: PropTypes.object
};
