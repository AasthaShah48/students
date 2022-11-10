import { actionTypes } from './constant/actionTypes';

export const Actions = {

  register: (student) => ({ type: actionTypes.REGISTER, payload: { student } }),
  unregister: (student) => ({ type: actionTypes.UNREGISTER, payload: { student } }),
  login: (student) => ({ type: actionTypes.LOGIN, payload: { student } }),
  logout: (student) => ({ type: actionTypes.LOGOUT, payload: { student } }),
  adddetails: (student) => ({ type: actionTypes.ADDDETAILS, payload: { student } }),
  updatedetails: (student) => ({ type: actionTypes.UPDATEDETAILS, payload: { student } }),
  deletedetails: (student) => ({ type: actionTypes.DELETEDETAILS, payload: { student } }),
  getstudent: (student) => ({ type: actionTypes.GETSTUDENT, payload: { student } }),
  studentprofile: (student) => ({type: actionTypes.STUDENTPHOTO, payload: { student } }),
  getprofile: (student) => ({ type: actionTypes.GETPHOTO, payload: { student } }),
}