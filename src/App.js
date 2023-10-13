
import { Route, Routes } from 'react-router';
import './App.css';
import Home from "../src/pages/Home";

function App() {
  return (
    <div className='w-screen h-[100%] flex flex-col bg-richblack-900 font-inter'>
    <Routes>
     <Route path='/' element={<Home></Home>}></Route>
    </Routes>
    </div>
  );
}

export default App;
