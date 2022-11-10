import  React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';


export default function ConfirmationDialogRaw(props) {
    const { onClose,onOk,dialogtitle, dialogcontent,open, ...other } = props;
  
    const handleCancel = () => {
      onClose();
    };
  
    const handleOk = () => {
      onOk();
      onClose();
    };

    return (
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        open={open}
        {...other}
      >
        <DialogTitle sx={{fontWeight:'bold', fontFamily : `Roboto` ,fontStyle: 'normal' , fontSize: '1.5rem', color: 'midnightblue'}}>{dialogtitle}</DialogTitle>
        <DialogContent sx={{fontFamily : `Roboto` , color: 'primary.main'}} dividers>{dialogcontent}       
        </DialogContent>
        <DialogActions>            
          <Button autoFocus onClick={handleCancel} sx={{  border: '1px solid',borderColor: 'secondary',}}>
            No
          </Button> 
          <Button onClick={handleOk} sx={{ border: '1px solid',borderColor: 'secondary',}}>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  }
  
  ConfirmationDialogRaw.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };