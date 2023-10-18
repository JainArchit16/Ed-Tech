
import { Route, Routes } from 'react-router';
import './App.css';
import Home from "../src/pages/Home";
import Navbar from './components/common/Navbar';
import About from './pages/About';


function App() {
  return (
    <div className='w-screen h-[100%] flex flex-col bg-richblack-900 font-inter'>
    <Navbar></Navbar>
    <Routes>
    <Route path='/' element={<Home></Home>}></Route>
    <Route path='/about' element={<About/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
