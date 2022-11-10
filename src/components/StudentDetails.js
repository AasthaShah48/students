import Header from './Header';
import React ,{useState , useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Grid from '@mui/material/Grid';
import { Actions } from '../Redux/actions/action';
import ConfirmationDialogRaw from './FormsUI/Confirmation';
import ModalRaw from './FormsUI/Dialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import UpdateDetails from './UpdateDetails';
import Alert from '@mui/material/Alert';


const datagridSx = {
  borderRadius: 2,
  border: '1px solid', borderColor: 'primary.main',width: "150",
  "& .MuiDataGrid-main": { borderRadius: 2 },
  '& div[data-rowIndex][role="row"]' : {
    color: 'black',
    fontSize: 18,
    minHeight: "60px !important",
    height: 60,
  },
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: 'white',
    color: "midnightblue",
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily : `Roboto`
  }
};

function StudentDetails() {
 
  const [alert, setAlert] = useState(false);
  const [alertcontent, setAlertcontent] = useState(false);
  const users = useSelector((state) => state.studentDetails.studentdata);
  const students = useSelector((state) => state.allStudent.students);
  const profile= useSelector((state) => state.studentprofile.loggedstudentprofile);
  const user = useSelector((state) => state.allStudent.studentlogin);
  const studentdetails= students.find((student) => student.email === user.email)
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const [file, setFile] = useState("");
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(false);
  const handleClose = () => {
    setOpen(false);
    }
  const handleEnd = () => {
    setStart(false); 
    }
  const handleStop = () => {
    setStart(false); 
    setAlert(true);
    setAlertcontent('Updated data successfully');
   }
   const handleFileUpload = (e) => {  
      if (!e.target.files) {
        return;
      }
      const file = e.target.files[0];
      if (!file.type.match(imageMimeType)) {
        alert("Image type is not valid");
        return;
      }  
      dispatch(Actions.studentprofile({file , email: user.email})); 
      dispatch(Actions.getprofile({ email: user.email})) 
      setFile(file); 
    }
      
    useEffect(() => {
      let reader, isCancel = false;
      if (file) {
        const reader = new FileReader();
      reader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setData(result)
        }
      }
      reader.readAsDataURL(file); 
    };
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
   }, [file,profile.file]);

   useEffect(() => {
    if(alert){setTimeout(() => {
      setAlert(false)
    }, 3000)}
   
  }, [alert]);
  
  const columns = [
    { field: "id", headerName: "Id", width: 200 ,headerAlign: 'center',},
    { field: "class", headerName: "Class", width: 200 , headerAlign: 'center', },
    { field: "subject", headerName: "Subject", width: 200 , headerAlign: 'center', },
    { field: "marks", headerName: "Marks", width: 200 , headerAlign: 'center', },
    { field: "description", headerName: "Description", width: 200 , headerAlign: 'center', },
    {
      field: "actions",
      headerName: "actions",
      width: 200,
      headerAlign: 'center',
      renderCell: (params) => {
              return(     
                <>                                                  
                <BorderColorIcon
                onClick={() => {
                  dispatch(Actions.getstudent({ id: params.row.id}));  
                  setStart(true); 
                }}
                  variant="contained"
                  color='primary'
                  aria-haspopup="true"
                  aria-controls="update-box"
                  sx={{ marginRight: "2rem", 
                        marginLeft: '2rem'}}
                />                           
               
                <DeleteIcon
                  onClick={() => {
                    setOpen(true);
                  }}
                  variant="contained"
                  color='primary'  
                  aria-haspopup="true"
                  aria-controls="confirmation-box"               
                />                 

              <ModalRaw
                id="update-box"
                keepMounted
                open={start}
                onClose={handleEnd}
                dialogcontent={<UpdateDetails onClose={handleStop}/>}
                sx={{'& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
               />   
              <ConfirmationDialogRaw
                id="confirmation-box"
                keepMounted
                open={open}
                onClose={handleClose}
                onOk={() => {
                  dispatch(Actions.deletedetails({ id: params.row.id}));  
                  setAlert(true);
                  setAlertcontent('Deleted data successfully');
                }}
                dialogtitle = 'Delete Confirmation' 
                dialogcontent ='Are you sure want to delete?'
               /> 
               </>     
         )
      }
}, ];

  return (
    <>
      <Header /> 
      <Grid style={{ margin: '20px' , padding:'20px' , border: '1px solid', borderColor: 'blueviolet'}}>  
      <Grid container item xs={12} justifyContent='center'  marginBottom= '20px' >

      <Card sx={{ borderRadius: '50%' , height: 170, border: 'thin solid', borderColor: 'primary.main',width: "150" }} >
      <CardActionArea component="label" variant="outlined"
        sx={{ marginRight: "1rem" }}>
          { data.length>0 && data ? <CardMedia
         component="img"
         height="120"
         width="150"
         image = {data.toString()} />  :  <CardMedia
         component="img"
         height="120"
         width="150"
         image = 'profile.png'/>  }      
      <TextField type="file" accept='.png, .jpg, .jpeg'  sx={{ display: 'none' }} onChange={handleFileUpload} /> 
       <CardContent>
          <Typography height='50' gutterBottom variant="h6" component="div" sx={{ border: '1px solid', borderColor: 'blueviolet' ,fontSize:'80%', fontFamily : `Roboto`, alignItems:'center' , color: 'midnightblue' , fontStyle: 'oblique' , fontWeight:'bold'}}>
          { studentdetails.firstName + " " + studentdetails.lastName }
          </Typography>
        </CardContent>
      </CardActionArea>
      </Card>

      </Grid>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={users}
            columns={columns}
            rowsPerPageOptions={[5]}   
            sx={datagridSx}                
          />
        </div>
        {alert ? <Alert sx={{width: '30%', marginTop:'5px'}}severity="success">{alertcontent}</Alert> : '' }
        <Grid container item xs={12} justifyContent='flex-end' margin= '20px' padding='20px'>
          <Link to="/student/details/add" className="btn btn-link">
            <Button color='primary' endIcon={<SendIcon />} sx={{ border: '1px solid', fontFamily : `Roboto`, alignItems:'center',fontWeight:'bold'}} variant='contained'>Add User</Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};
export default StudentDetails;