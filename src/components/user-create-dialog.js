import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { blue } from "@mui/material/colors";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { api as axiosApi } from "../utils/axiosapi";
import PropTypes from "prop-types";

CreateDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.object,
  type: PropTypes.string,
};

export default function CreateDialog(props) {
  const { onClose, open, data, type } = props;

  const handleClose = () => {
    onClose();
  };

  const handleSave = async (value) => {
    switch (type) {
      case "User":
        // const result = await axiosApi.post(`/visitors/${selectedId}`, {});
        // if (result.status == 200) {
        //   handleClose();
        //   window.location.reload(false);
        // } else {
        //   console.log("Error");
        // }
        break;
      default:
        break;
    }
  };

  const form = () => {
    switch (type) {
      case "User":
        return (
          <form>
            <Box pt={1}>
              <Grid container spacing={2}>
                <Grid item={true} xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="First name"
                    name="firstName"
                    required
                    value={data?.first_name}
                  />
                </Grid>
                <Grid item={true} xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Last name"
                    name="lastName"
                    required
                    value={data?.last_name}
                  />
                </Grid>
                <Grid item={true} xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    required
                    value={data?.email}
                  />
                </Grid>
                <Grid item={true} xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    type="number"
                    value={data?.phone}
                  />
                </Grid>
                <Grid item={true} xs={12} md={6}>
                  <TextField fullWidth label="Company" name="company" value={data?.company} />
                </Grid>
              </Grid>
            </Box>
          </form>
        );
      case "SignIn":
        return (
          <form>
            <Box pt={1}>
              <Grid container spacing={2}>
                {data ? (
                  <>
                    <Grid item={true} xs={12} md={6}>
                      <DateTimePicker 
                        // fullWidth
                        label="Signin Time"
                        // name="signin"
                        // required
                        value={new Date(data?.signin_time)}
                      />
                    </Grid>
                    <Grid item={true} xs={12} md={6}>
                      <DateTimePicker 
                        // fullWidth
                        label="Signout Time"
                        // name="signout"
                        value={new Date(data?.signout_time)}
                      />
                    </Grid>
                  </>
                ) : (
                  <></>
                )}
              </Grid>
            </Box>
          </form>
        );
      default:
        return;
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        {data ? "Edit" : "Create"} {type}
      </DialogTitle>
      <DialogContent>{form()}</DialogContent>
      <DialogActions>
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
