import React from 'react';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
}

const TextfieldWrapper = ({input , label ,  meta: { touched, error } , ...otherProps }) => {

  const configTextfield = {
    ...input,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined',
    label: label,
  };

  return (
    <>
    <FormControl fullWidth= {true} error={touched && error} >
    <TextField {...configTextfield}  />
    {renderFromHelper({ touched, error })}
    </FormControl>
    </>
  );
 };

export default TextfieldWrapper;