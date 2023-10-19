
import { Route, Routes } from 'react-router';
import './App.css';
import Home from "../src/pages/Home";
import Navbar from './components/common/Navbar';
import About from './pages/About';
import Error from './pages/Error';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';


function App() {
  return (
    <div className='w-screen h-[100%] flex flex-col bg-richblack-900 font-inter'>
    <Navbar></Navbar>
    <Routes>
    <Route path='/' element={<Home></Home>}></Route>
    <Route path='/about' element={<About/>}></Route>
    <Route path='/404' element={<Error/>}></Route>
    <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
    <Route path='/update-password/:id' element={<UpdatePassword/>}></Route>
    <Route path='/verifyemail' element={<VerifyEmail/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
