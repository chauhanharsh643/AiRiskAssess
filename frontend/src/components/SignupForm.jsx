import React, { useEffect, useState } from 'react';
import './SignupForm.css'; // Import CSS file for styling
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil';
import { loginAtom } from '../atom/loginAtom';
import { useNavigate } from 'react-router-dom';


const SignupForm = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);

  const [alertType, setAlertType] = useState("warning");
  const [alertText, setAlertText] = useState("");
  const [alert, setAlert] = useState(false)

  const setLoginState = useSetRecoilState(loginAtom);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic for form submission
    const body = {
      "first_name" : firstName,
      "last_name" : lastName,
      "email" : username,
      "password" : password
    }


    try{
      const response = await axios.post('http://localhost:3000/api/v1/signup', body);

      console.log(response.data.message)

      if(response.data.message == "User Already exists"){
        setAlert(true)
        setAlertType("warning")
        setAlertText("User Already Exists.")
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
  };

  useEffect(() => {
    // Check if all input fields are filled
    if (firstName && lastName && username && password && isChecked) {
      setIsFormFilled(true);
    } else {
      setIsFormFilled(false);
    }
  }, [firstName, lastName, username, password, isChecked]);

  return (
    <div className='container_signup'>
      <Link to="/" className="risk-assess">AIHealthAssess</Link>
    <div className="signup-form">

    {alert && ( <Alert severity={alertType}>{alertText}</Alert>)}

      <h2>Signup AI Health Assess</h2>

      {/* Form inputs */}
      <form onSubmit={handleSubmit}>
        {/* First name and Last name input */}
        <div className="form-group double">
          <div className="name-input">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="name-input">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
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
        {/* Checkbox for terms and conditions */}
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <span>I agree to the Terms and Conditions</span>
        </label>
        {/* Submit button */}
        <button type="submit" className={`button ${isFormFilled ? 'filled' : ''}`}>Continue</button>
      </form>

      {/* Button for login through Google */}
      <div className='google-signup-text'>or connect with</div>
      <button className="google-signup-button"><FcGoogle /> <span>Google</span></button>

      {/* Link to login */}
      <p>Already have an account? <Link to="/login">Login to your account</Link></p>
    </div>
    </div>
  );
};

export default SignupForm;
