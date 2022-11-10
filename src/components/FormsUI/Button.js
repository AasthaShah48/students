import React from 'react';
import Button from '@mui/material/Button';

const ButtonWrapper = ({
  children,
  ...otherProps
}) => {

  const configButton = {
    ...otherProps,
    variant: 'contained',
    color: 'primary',
  }

  return (
    <>
    <Button
      {...configButton}
    >
      {children}
    </Button>
    </>
  );
};

export default ButtonWrapper;