import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Result from './pages/Result';
import Profile from './pages/Profile';
import EmpReq from './pages/EmpReq';
import EmpRemove from './pages/EmpRemove';
import AddEmp from './pages/AddEmp';
import Notification from './pages/Notification';
import AddProject from './pages/AddProject';
import AddCompany from './pages/AddCompany';
import AddTrainings from './pages/AddTrainings';

function App() {
  const isAdminLoggedIn = () => {
    const adminToken = localStorage.getItem("ido");
    return adminToken;
  };
  const AdminRoute = ({ element }) => {
    return isAdminLoggedIn() ? element : <Navigate to="/login" />;
  };
  
  return (
    <div className="App">
     <Routes>
     <Route path='/' element={<AdminRoute element={<Home />} />} ></Route>
     <Route path='/login' element={<Login></Login>} ></Route>
     <Route path='/result' element={<AdminRoute element={<Result />} />} ></Route>
     <Route path='/profile/:id' element={<AdminRoute element={<Profile />} />} ></Route>
     <Route path='/request' element={<AdminRoute element={<EmpReq />} />} ></Route>
     <Route path='/remove' element={<AdminRoute element={<EmpRemove />} />} ></Route>
     <Route path='/add' element={<AdminRoute element={<AddEmp />} />} ></Route>
     <Route path='/notifications' element={<AdminRoute element={<Notification />} />} ></Route>
     <Route path='/addproject' element={<AdminRoute element={<AddProject />} />} ></Route>
     <Route path='/addcompany' element={<AdminRoute element={<AddCompany />} />} ></Route>
     <Route path='/addtrainings' element={<AdminRoute element={<AddTrainings />} />} ></Route>
     </Routes>
    </div>
  );
}

export default App;
