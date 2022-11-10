import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
}

const SelectFieldWrapper = ({
    input,
    options,
    label,
    meta: { touched, error },
    children,
    ...otherProps
  }) => (
    <>
   <FormControl fullWidth= {true} error={touched && error} >
    <InputLabel htmlFor="color-native-simple">{label}</InputLabel>
    <Select
      native
      {...input}
      {...otherProps}      
      inputProps={{
        name: input.name,
        id: 'color-native-simple'
      }}
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>  
  
 </>
  )

  export default SelectFieldWrapper;