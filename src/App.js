import './App.css';
import SignIn from './components/SignIn';
import Login from './components/Login';
import StudentDetails from './components/StudentDetails';
import AddDetails from './components/AddDetails';
import {Routes , Route} from "react-router-dom";
import ProtectedRoute from './components/protectedRoute';

function App() {
  return (
    <div className="App">
       <Routes>
          <Route path="/" exact element={<SignIn />} />
          <Route path="/students/login" exact element={<Login />} />
          <Route path="/student" exact  element={
           <ProtectedRoute>
            <StudentDetails />
           </ProtectedRoute>
        }/> 
          <Route path="/student/details/add" exact element={ <ProtectedRoute><AddDetails /></ProtectedRoute>}/>
          <Route>404 Not Found!</Route>
      </Routes>
    </div>
  );
  }

export default App;