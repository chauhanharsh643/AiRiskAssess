import React, { useEffect, useState } from 'react';
import './LoginForm.css'; // Import CSS file for styling
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';

import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil';

import { loginAtom } from '../atom/loginAtom';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  // State for form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isFormFilled, setIsFormFilled] = useState(false);

  const [alertType, setAlertType] = useState("warning");
  const [alertText, setAlertText] = useState("");
  const [alert, setAlert] = useState(false)

  const setLoginState = useSetRecoilState(loginAtom);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      "email" : username,
      "password" : password
    }


    try{
      const response = await axios.post('http://localhost:3000/api/v1/login', body);

      console.log(response.data.message)

      if(response.data.message == "Please Sign up first" || response.data.message == "Password is not Correct"){
        setAlert(true)
        setAlertType("warning")
        setAlertText(response.data.message)
      }
      else{
        setAlert(false);
        setLoginState(true);
        navigate('/');
      }
    }
    catch(error){
      console.log(error)
    }
    // Logic for form submission
    console.log('Form submitted');
  };

  useEffect(() => {
    // Check if all input fields are filled
    if (username && password) {
      setIsFormFilled(true);
    } else {
      setIsFormFilled(false);
    }
  }, [username, password]);

  return (
    <div className='container'>
      <Link to="/" className="risk-assess">AIHealthAssess</Link>
    <div className="login-form">
      <h2>Welcome to  AI Health Assess</h2>
      <p>Nice to se you again</p>
      {alert && ( <Alert severity={alertType}>{alertText}</Alert>)}

      {/* Form inputs */}
      <form onSubmit={handleSubmit}>
        {/* Username input */}
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input
            type="email"
            id="username"
            placeholder="Enter your email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        {/* Password input */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Choose a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Submit button */}
        <button type="submit" className={`button ${isFormFilled ? 'filled' : ''}`}>Continue</button>
      </form>

      {/* Button for login through Google */}
      <div className='google-login-text'>or login with</div>
      <button className="google-login-button"><FcGoogle /> Google</button>

      {/* Link to login */}
      <p><Link to="/signup">Signup for an account</Link></p>
    </div>
    </div>
  );
};

export default LoginForm;
