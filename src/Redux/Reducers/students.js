import { actionTypes } from '../actions/constant/actionTypes';

const initialState = {
  students: [],
  studentlogin: {},
  authenticated: false,
};
const initialValues = {
  studentdata: [],
  selectedstudentdata: {}, 
};
const initialData={
  studentprofile: [],
  loggedstudentprofile:{}
};

export const students = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        authenticated: true,
        studentlogin: action.payload.student
      }
    case actionTypes.LOGOUT:
      return {
        ...state,
        authenticated: false,
        studentlogin: {}
      }
    case actionTypes.REGISTER:
      return {
        ...state,
        students: [...state.students, action.payload.student]
      }  
    case actionTypes.UNREGISTER:
      return {
         ...state,
         authenticated: false,
         students: state.students.filter((student) => student.id !== action.payload.student.id),
         studentlogin: {}
     } 
    default:
      return { ...state };
  }
};

export const studentprofile = (state = initialData, action) => {
  switch (action.type) {
    case actionTypes.STUDENTPHOTO:
      return {
         ...state,
         studentprofile:  [...state.studentprofile, action.payload.student]
        }   
    case actionTypes.GETPHOTO:
          return {
            ...state,
            loggedstudentprofile: state.studentprofile.find((student) => student.email === action.payload.student.email),
          }  
    default:
      return { ...state };
  }
};


export const selectedStudentReducer = (state = initialValues , action ) => {
  switch (action.type) {
    case actionTypes.ADDDETAILS:
      return {
        ...state,
        studentdata: [...state.studentdata, action.payload.student]
      }
    case actionTypes.UPDATEDETAILS:
      const userData = []
      state.studentdata.filter((item) => {
        if( item.id != action.payload.student.id){ 
          userData.push(item)
        } else {
          userData.push(action.payload.student)
        }
      })
      return {
        studentdata : userData
      }
    case actionTypes.DELETEDETAILS:
      return {
         ...state,
        studentdata: state.studentdata.filter((student) => student.id !== action.payload.student.id),
      }
    case actionTypes.GETSTUDENT:
      return {
        ...state,
        selectedstudentdata: state.studentdata.find((student) => student.id === action.payload.student.id),
      } 
    default:
      return { ...state };
  }
};