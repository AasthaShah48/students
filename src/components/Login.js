import React from 'react'
import { Field , reduxForm } from 'redux-form'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import Button from './FormsUI/Button';
import { signUpSchema } from '../schemas';
import { useSelector, useDispatch } from "react-redux";
import {Actions} from '../Redux/actions/action';
import {useNavigate} from "react-router-dom";
import { SubmissionError } from 'redux-form';
import TextfieldWrapper from './FormsUI/TextField';
import Container from '@mui/material/Container';


const LogIn = (props) => {

    const student = useSelector((state) => state.allStudent.students);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submit = values => {          
       const studentdetail =  student.find((student) => student.email === values.email); 
       if (!(studentdetail)) {
        throw new SubmissionError({
           email : 'Id does not exist',
           error: 'Login failed!',
        });
      } else if (!(values.password == studentdetail.password)) {
        throw new SubmissionError({
          password: 'Wrong password',
          error: 'Login failed!',
        });
      }  else {
        dispatch(Actions.login({ ...values})
        )
        navigate("/student");    
      }                                                              
  }
  const { handleSubmit} = props
  return (
    <>
    <Grid container>
     <Grid item xs={12}>
       <Container maxWidth="md" sx={{
            mt: 5,
            mb: 8,
       }}>
    <form onSubmit={handleSubmit(submit)}>
     <Grid container spacing={2} sx={{ border: '1px solid', borderColor: 'blueviolet' , padding:'20px' }}>

     <Grid container item xs={12} justifyContent= 'center' padding={2}>
      <Typography  sx={{ border: '1px solid',width: '50%' ,height: '120%', borderColor: 'blue' , fontFamily : `Roboto`, alignItems:'center' , fontSize: '1.5rem', color: 'midnightblue' , fontStyle: 'oblique' , fontWeight:'bold'}}>
        Login
      </Typography>
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

    <Button type="submit"sx={{ border: '1px solid', fontFamily : `Roboto`, alignItems:'center'  ,fontWeight:'bold'}} >
      Submit
    </Button> 
    
  </Grid> 

  <Grid item xs={12}>
   <Link to="/" className="btn btn-link">
      <Typography>
      New Student? Sign up here
     </Typography>
   </Link>
  </Grid>

 </Grid>
 </form>
 </Container>
 </Grid>
 </Grid>

 </>
  )
}

export default reduxForm({
  form: 'login',
  validate : signUpSchema,
})(LogIn)