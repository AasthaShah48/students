import  React from 'react';
import PropTypes from 'prop-types';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';


export default function ModalRaw(props) {
    const {dialogcontent,start,value, ...other } = props;

    return (
      <Dialog
        maxWidth="md"
        open={start}
        {...other}
      >
        <DialogContent dividers>{dialogcontent}       
        </DialogContent>
      </Dialog>
    );
  }
  
  ModalRaw.propTypes = {
    open: PropTypes.bool.isRequired,
  };