import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Result from './pages/Result';
import Profile from './pages/Profile';
import EmpReq from './pages/EmpReq';
import EmpRemove from './pages/EmpRemove';
import AddEmp from './pages/AddEmp';

function App() {
  return (
    <div className="App">
     <Routes>
     <Route path='/' element={<Home></Home>} ></Route>
     <Route path='/login' element={<Login></Login>} ></Route>
     <Route path='/result' element={<Result></Result>} ></Route>
     <Route path='/profile/:id' element={<Profile></Profile>} ></Route>
     <Route path='/request' element={<EmpReq></EmpReq>} ></Route>
     <Route path='/remove' element={<EmpRemove></EmpRemove>} ></Route>
     <Route path='/add' element={<AddEmp></AddEmp>} ></Route>


     </Routes>
    </div>
  );
}

export default App;
