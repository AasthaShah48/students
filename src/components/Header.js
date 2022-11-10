import React , {useEffect,useState}from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ChaletIcon from '@mui/icons-material/Chalet';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { Actions } from '../Redux/actions/action';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Profile from './Profile';
import ModalRaw from './FormsUI/Dialog'

const Header = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile= useSelector((state) => state.studentprofile.loggedstudentprofile);
  const user = useSelector((state) => state.allStudent.studentlogin);
  const [start, setStart] = useState(false);

  const handleEnd = () => {
    setStart(false);
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
    <AppBar position="static"  color='primary' margin= '30px' padding='50px'>
          <Container >
            <Toolbar>            
               <ChaletIcon sx={{ mr: 2 }} fontSize='large' />             
               <Typography
                 variant="h6"
                 sx={{
                 mr: 2,
                 display: { xs: 'none', md: 'flex' },
                 fontFamily: 'monospace',
                 fontWeight: 700,
                 color: 'inherit',
                 textDecoration: 'none',  
                 flexGrow: 1           
                 }}
                 >
                 Student Profile
               </Typography>        
               <IconButton aria-describedby="update-box" color='inherit' variant="contained" aria-haspopup="true" aria-controls="update-box"  onClick={() => {setStart(true); }}>
               { data.length>0 && data ? <Avatar src={data.toString()} /> :  <Avatar src='profile.png' />  }      
               </IconButton> 
               <ModalRaw
                   id="update-box"
                    keepMounted
                    open={start}
                    onClose={handleEnd}
                    dialogcontent={<Profile/>}
                    sx={{'& .MuiDialog-paper': { position: 'absolute',
                    right: 10,
                    top: 50 } }}
                />   
               <LogoutIcon 
                 onClick={() => {
                 navigate("/students/login");  
                 dispatch(Actions.logout({ ...user} ))
                }}  />                      
            </Toolbar>
         </Container>   
    </AppBar>
  );
};

export default Header;