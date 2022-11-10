import { combineReducers } from "redux";
import { students , selectedStudentReducer , studentprofile } from "./students";
import { reducer as formReducer } from "redux-form";


const reducers = combineReducers({
  form : formReducer,
  allStudent: students,
  studentDetails: selectedStudentReducer,
  studentprofile: studentprofile,
});
export default reducers;