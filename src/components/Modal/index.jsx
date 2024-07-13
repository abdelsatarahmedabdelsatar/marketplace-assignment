import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const Modal = ({desc,open,setOpen,handlFun}) => {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
        <DialogTitle style={{width:"500px"}} id="form-dialog-title">confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
           {desc}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="info">
            cancel
          </Button>
          <Button onClick={handlFun} color="primary" variant='contained'>
            confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
