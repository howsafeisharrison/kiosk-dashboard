import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { blue } from '@mui/material/colors';
import { Button, DialogContent, Typography } from '@mui/material';

DeleteDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
    type: PropTypes.string,
};

export default function DeleteDialog(props) {
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleDelete = (value) => {
      
    };
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Delete {type}</DialogTitle>
        <DialogContent>
          <Typography>Are you sure want to delete {data}?</Typography>
          <Button>Yes</Button>
          <Button>No</Button>
        </DialogContent>
      </Dialog>
    );
  }