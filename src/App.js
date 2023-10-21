
import { Route, Routes } from 'react-router';
import './App.css';
import Home from "../src/pages/Home";
import Navbar from './components/common/Navbar';
import About from './pages/About';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Logout from './pages/Logout';
import Errorpage from "./pages/Errorpage";
import MyProfile from './components/core/Dashboard/MyProfile';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/core/Auth/PrivateRoute';

function App() {
  return (
    <div className='w-screen h-[100%] flex flex-col bg-richblack-900 font-inter'>
    <Navbar></Navbar>
    <Routes>
    <Route path='/' element={<Home></Home>}></Route>
    <Route path='/about' element={<About/>}></Route>
    <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
    <Route path='/update-password/:id' element={<UpdatePassword/>}></Route>
    <Route path='/verifyemail' element={<VerifyEmail/>}></Route>
    <Route path='/contact' element={<ContactUs/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/signup' element={<Signup/>}></Route>
    <Route path='/logout' element={<Logout/>}></Route>
    <Route path='/dashboard' element={<PrivateRoute>
      <Dashboard/>
    </PrivateRoute>}>
      <Route path='my-profile' element={<MyProfile/>}></Route>
    </Route>
    
    <Route path='*' element={<Errorpage/>}></Route>

    </Routes>
    </div>
  );
}

export default App;
