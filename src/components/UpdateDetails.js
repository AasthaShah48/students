import React from 'react';
import { useSelector} from "react-redux";
import AddDetails from './AddDetails';

export default function UpdateDetails(props) {
  const {onClose} = props
  
    const userData = useSelector(state => state.studentDetails.selectedstudentdata);
  return (
   <>
        <AddDetails initialValues={userData} onClose={onClose}/>
    </>
  )
};