import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Button, DialogActions, DialogContent, Typography } from "@mui/material";
import { api as axiosApi } from "../utils/axiosapi";
import PropTypes from "prop-types";

DeleteDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedId: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
};

export default function DeleteDialog(props) {
  const { onClose, selectedId, open, description, type } = props;

  const handleClose = () => {
    onClose();
  };

  const handleDelete = async (value) => {
    let result;
    switch (type) {
      case "User":
        result = await axiosApi.delete(`/visitors/${selectedId}`);
        if (result.status == 200) {
          handleClose();
          window.location.reload(false);
        } else {
          console.log("Error");
        }
        break;
      case "SignIn":
        result = await axiosApi.delete(`/visits/${selectedId}`);
        if (result.status == 200) {
          handleClose();
          window.location.reload(false);
        } else {
          console.log("Error");
        }
        break;
      case "SiteAlert":
        result = await axiosApi.delete(`/visitors/deleteSiteRule/${selectedId}`);
        if (result.status == 200) {
          handleClose();
          window.location.reload(false);
        } else {
          console.log("Error");
        }
        break;
      default:
        break;
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Delete {type}</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure want to delete {description}? This action cannot be reversed.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete}>Yes</Button>
        <Button onClick={handleClose}>No</Button>
      </DialogActions>
    </Dialog>
  );
}
