import React ,{useState,useEffect} from 'react'
import { Field, reduxForm} from 'redux-form'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextfieldWrapper from './FormsUI/TextField';
import { Link } from "react-router-dom";
import Button from './FormsUI/Button';
import { useSelector, useDispatch } from "react-redux";
import { Actions } from '../Redux/actions/action';
import Container from '@mui/material/Container';
import { detailsValidation } from '../schemas/detailsValidation';
import SendIcon from '@mui/icons-material/Send';
import SelectFieldWrapper from './FormsUI/SelectField';
import Header from './Header';
import Alert from '@mui/material/Alert';

const options = [
  { value: " " },
  { label: "Class 1", value: "Class 1" },
  { label: "Class 2", value: "Class 2" },
  { label: "Class 3", value: "Class 3" },
  { label: "Class 4", value: "Class 4" },
  { label: "Class 5", value: "Class 5" },
  { label: "Class 6", value: "Class 6" },
  { label: "Class 7", value: "Class 7" },
  { label: "Class 8", value: "Class 8" },
  { label: "Class 9", value: "Class 9" },
  { label: "Class 10", value: "Class 10" },
  { label: "Class 11", value: "Class 11" },
  { label: "Class 12", value: "Class 12" },
];
const AddDetails = (props) => {
  const [alert, setAlert] = useState(false);
  const { handleSubmit, reset , onClose} = props
  const usersAmount = useSelector((state) => state.studentDetails.studentdata.length);
  const user = useSelector((state) => state.allStudent.studentlogin);
  const userData = useSelector(state => state.studentDetails.selectedstudentdata);
  const dispatch = useDispatch();
  const submit = values => {
    if ( userData !==undefined  && userData.hasOwnProperty('id')) {           
      dispatch(Actions.updatedetails({ ...values , id: userData.id }));       
      onClose(); 
    } else {
      dispatch(Actions.adddetails({ ...values, id: (usersAmount) + 1 , email: user.email} ))
      reset();
      setAlert(true);
    }    
  }
  useEffect(() => {
    if(alert){setTimeout(() => {
      setAlert(false)
    }, 3000)}
   
  }, [alert]);
  return (
    <>
     { (userData !==undefined  && userData.hasOwnProperty('id')) ? ' ' : <Header/> }
      <Grid container  >
        <Grid item xs={12}>
          <Container maxWidth="md" sx={{
            mt: 5,
            mb: 8,
          }}>
            <form onSubmit={handleSubmit(submit)} >

              <Grid container spacing={2} sx={{ border: '1px solid', borderColor: 'blueviolet' , padding:'20px' }} >
                <Grid container item xs={6} justifyContent='flex-start'  border='thin'>
                  <Typography variant="h6" color='primary' position="static" sx={{fontWeight:'bold', fontFamily : `Roboto` , fontSize: '1.5rem', color: 'midnightblue'}}>
                    {userData !==undefined  && userData.hasOwnProperty('id') ? 'Update Details' : 'Add Details'}
                  </Typography>
                </Grid>

               <Grid container item xs={6} justifyContent='flex-end'>
               { (userData !==undefined  && userData.hasOwnProperty('id')) ? 
                ' ' : <Link to="/student" className="btn btn-link" >
                <Button>
                  Your Details
                </Button>
              </Link> }
                </Grid>

                <Grid item xs={4}>
                 <Field
                    name="class"
                    label="Class"
                    type="text"
                    component={SelectFieldWrapper} 
                    >
                      {options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                     ))}
                 </Field>
                </Grid>
          
                <Grid item xs={4}>
                  <Field
                    name="subject"
                    label="Subject Name"
                    type="text"
                    component={TextfieldWrapper}
                  />
                </Grid>

                <Grid item xs={4}>
                  <Field
                    name="marks"
                    label="Marks"
                    type="number"
                    component={TextfieldWrapper}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    name="description"
                    label="Description"
                    type="text"
                    component={TextfieldWrapper}
                  />
                </Grid>

                <Grid container item xs={12} justifyContent='flex-end'>
                  <Button  endIcon={<SendIcon />}  type="submit"  sx={{ width: '30%', border: '1px solid',borderColor: 'secondary',}} >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
            {alert ? <Alert sx={{width: '30%', marginTop:'5px'}}severity="success">Data Added successfully</Alert> : '' }
          </Container>        
        </Grid>
      </Grid>
    </>
  )
}

export default reduxForm({
  form: 'addDetails', 
  validate : detailsValidation, 
  enableReinitialize: true,
})(AddDetails)