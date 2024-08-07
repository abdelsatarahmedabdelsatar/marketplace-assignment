import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const Modal = ({desc,open,setOpen,handleFun}) => {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
        <DialogTitle style={{width:"420px"}} id="form-dialog-title">confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
           {desc}
          </DialogContentText>
        </DialogContent>
        <DialogActions className='m-4'>
          <Button onClick={handleClose} color="inherit">
            cancel
          </Button>
          <Button onClick={handleFun} color="success" variant='contained'>
            confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
