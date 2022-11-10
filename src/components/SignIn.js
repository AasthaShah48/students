import React ,{useState,useEffect} from 'react'
import { Field, reduxForm } from 'redux-form'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextfieldWrapper from './FormsUI/TextField';
import { Link } from "react-router-dom";
import Button from './FormsUI/Button';
import { useSelector, useDispatch } from "react-redux";
import { Actions } from '../Redux/actions/action';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom"
import { signUpSchema } from '../schemas';
import { SubmissionError } from 'redux-form';
import Alert from '@mui/material/Alert';
import SelectFieldWrapper from './FormsUI/SelectField';

const options = [
  { value: " " },
  { label: "+91", value: "IN" },
  { label: "+93", value: "AF" },
  { label: "+213", value: "DZ" },
];

const SignIn = (props) => {
  const [alert, setAlert] = useState(false);
  const student = useSelector((state) => state.allStudent.students);
  const usersAmount = useSelector((state) => state.allStudent.students.length);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submit = values => {
    const studentdetail =  student.find((student) => student.email === values.email); 
    if (studentdetail) {
      throw new SubmissionError({
         email : 'Student already exits',
         error: 'Registration failed!',
      });
    } else {
      dispatch(Actions.register({ ...values, id: (usersAmount) + 1 })
      )
      setAlert(true);       
    }          
  }
  useEffect(() => {
    if(alert){setTimeout(() => {
      setAlert(false)
      navigate("/students/login"); 
    }, 900)}
   
  }, [alert,navigate]);

  const { handleSubmit } = props

  return (
    <>
      <Grid container >
        <Grid item xs={12}>
          <Container maxWidth="md" sx={{
            mt: 5,
            mb: 8,
          }}>
            <form onSubmit={handleSubmit(submit)}  >

              <Grid container spacing={2} sx={{ border: '1px solid',borderColor: 'blueviolet' , padding:'20px' }}>

                <Grid container item xs={12} justifyContent= 'center' padding={2}>
                  <Typography  sx={{ border: '1px solid',width: '50%' ,height: '120%', borderColor: 'blue' , fontFamily : `Roboto`, alignItems:'center' , fontSize: '1.5rem', color: 'midnightblue' , fontStyle: 'oblique' , fontWeight:'bold'}}>
                    Sign Up
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Field
                    name="firstName"
                    label="First Name"
                    type="text"
                    component={TextfieldWrapper}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    name="lastName"
                    label="Last Name"
                    type="text"
                    component={TextfieldWrapper}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    name="email"
                    label="Email"
                    type="email"
                    autoComplete='off'
                    component={TextfieldWrapper}
                  />
                </Grid>                 
                
                <Grid item xs={3}>
                 <Field
                    name="country"
                    label="country"
                    type="text"
                    component={SelectFieldWrapper} 
                    >
                      {options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                     ))}
                 </Field>
                </Grid>

                <Grid item xs={9}>
                  <Field
                    name="phone"
                    label="Phone"
                    type="number"
                    autoComplete='off'
                    component={TextfieldWrapper}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    name="age"
                    label="Age"
                    type="number"
                    autoComplete='off'
                    component= {TextfieldWrapper}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete='off'
                    component={TextfieldWrapper}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    autoComplete='off'
                    component={TextfieldWrapper}               
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" sx={{ border: '1px solid', fontFamily : `Roboto`, alignItems:'center'  ,fontWeight:'bold'}}>
                    Submit
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Link to="/students/login" className="btn btn-link">
                    <Typography>
                      Already signed up? Login here
                    </Typography>
                  </Link>
                </Grid>

              </Grid>
            </form>
            {alert ? <Alert sx={{width: '30%', marginTop:'5px'}}severity="success">Data Registered successfully</Alert> : '' }
          </Container>
        </Grid>
      </Grid>
    </>
  )
}


export default reduxForm({
  form: 'signin', 
  validate : signUpSchema, 
})(SignIn)
