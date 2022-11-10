import React , {useEffect,useState}from 'react';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { Actions } from '../Redux/actions/action';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Button from './FormsUI/Button'
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import ConfirmationDialogRaw from './FormsUI/Confirmation'


const Profile = () => {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const profile= useSelector((state) => state.studentprofile.loggedstudentprofile);
    const user = useSelector((state) => state.allStudent.studentlogin);
    const students = useSelector((state) => state.allStudent.students);
    const studentdetails= students.find((student) => student.email === user.email)
    const handleClose = () => {
        setOpen(false);
        }

    useEffect(() => {
      let reader, isCancel = false;
    if (profile.file) {
      const reader = new FileReader();
      reader.onload = (e) => {
      const { result } = e.target;
      if (result && !isCancel) {
        setData(result)
      }
    }
    reader.readAsDataURL(profile.file); 
    };
      return () => {
        isCancel = true;
        if (reader && reader.readyState === 1) {
          reader.abort();
        }
      }  
    }, [profile.file]);
  return (
    <Grid container item xs={12} justifyContent='center'   >
     <Card sx={{ height:436, border: '1px solid', borderColor: 'blueviolet',padding: '10px'}} >
         { data.length>0 && data ? <CardMedia
         component="img"
         height="50%"
         width="70"
         image = {data.toString()} />  :  <CardMedia
         component="img"
         height="50%"
         width="70"
         image = 'profile.png'/>  }
       <CardContent sx={{ border: '1px solid', borderColor: 'blueviolet', marginTop : '4px',}} >
          <Typography gutterBottom component="div" sx={{ fontSize: 16, fontFamily : `Roboto`, alignItems:'center' , color: 'midnightblue' , fontStyle: 'italic' , fontWeight:'bold' }}>
           { studentdetails.firstName + " " + studentdetails.lastName }
          </Typography>
          <Typography gutterBottom  component="div" sx={{  fontSize: 16,fontFamily : `Roboto`, alignItems:'center' ,  color: 'midnightblue' , fontStyle: 'oblique' ,  fontWeight: '20'}}>
           Age : {studentdetails.age}
          </Typography>
          <Typography gutterBottom  component="div" sx={{ fontSize: 16, fontFamily : `Roboto`, alignItems:'center' ,  color: 'midnightblue' , fontStyle: 'oblique' , fontWeight:'20'}}>
           Email : {studentdetails.email}
          </Typography>
          <Typography gutterBottom component="div" sx={{ fontSize: 16, fontFamily : `Roboto`, alignItems:'center' ,  color: 'midnightblue' , fontStyle: 'oblique' , fontWeight:'20'}}>
           Phone : { "(" +studentdetails.country + ")"+" " +studentdetails.phone  }
          </Typography>
          <Button  endIcon={<UnsubscribeIcon />}  onClick={() => {setOpen(true); }} sx={{ width: '80%',alignItems:'center', border: '1px solid',borderColor: 'primary.main',height:'10%'}} aria-haspopup="true" aria-controls="confirmation-box"  >
            Unsuscribe
          </Button>
         <ConfirmationDialogRaw
                id="confirmation-box"
                keepMounted
                open={open}
                onClose={handleClose}
                onOk={() => {
                  dispatch(Actions.unregister({ id: studentdetails.id}));  
                  navigate('/');
                }}
                dialogtitle = 'Unsubscribe' 
                dialogcontent ='Are you sure want to unsubscribe?'
         />  
        </CardContent>
      </Card>      
    </Grid>
  )
}

export default Profile
