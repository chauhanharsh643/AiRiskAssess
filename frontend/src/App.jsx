import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HeartDisease from './components/Heart_Disease/HeartDisease';
import Result from './components/Result/Result';
import { RecoilRoot, useRecoilValue } from 'recoil';
import DialogBox from './components/DialogBox/DialogBox';
import { dialogAtom } from './atom/dialogAtom';
import Home from './components/Home/Home';
import GetStarted from './components/GetStarted/GetStarted';
import About from './components/About/About';
import Help from './components/Help/Help';
import Diabeties from './components/Diabeties/Diabeties';
// import { useDispatch } from 'react-redux';

function App() {
  return (
    <RecoilRoot>
        <MainApp/>
    </RecoilRoot>
  )
}

const MainApp = () => {
  const [showSignupForm, setShowSignupForm] = useState(false);
  const isOpen = useRecoilValue(dialogAtom);

  return (

    <div className="app-container">
      <Router>
        
        <Navbar/>
        {/* <DialogBox/> */}
        <Routes>
          {/* <Route path='/' element = {<Dummy/>}></Route> */}
          <Route path='/' element={<Home/>}/>
          <Route path='/getStarted' element={<GetStarted/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/help' element={<Help/>}/>
          <Route path="/heartdisease" element = {<HeartDisease/>}/>
          <Route path="/diabeties" element = {<Diabeties/>}/>
          <Route path='/result' element = {<Result/>}/>
          <Route path="/signup" element = {<SignupForm/>}/>
          <Route path="/login" element = {<LoginForm/>}/>
        </Routes>
        <DialogBox/>
      </Router>

      </div>
  );
}

function Dummy(){
  return(
    <div></div>
  )
}

export default App;
