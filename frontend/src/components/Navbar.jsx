import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation from React Router
import { FaHome } from "react-icons/fa";
import './Navbar.css';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { loginAtom } from '../atom/loginAtom';
import { dialogAtom } from '../atom/dialogAtom';


const Navbar = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  // const [isLoggedIn, setLoginStatus] = useState(true);
  const isLoggedIn = useRecoilValue(loginAtom);
  const location = useLocation(); // Get current location

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setIsNavbarVisible(currentScrollPos < prevScrollPos || currentScrollPos < 150);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to check if current route is login or signup
  const isLoginOrSignup = () => {
    return location.pathname === '/login' || location.pathname === '/signup';
  };


  const setIsOpen = useSetRecoilState(dialogAtom);

  const openDialog = () => {
    setIsOpen(true);
  };

  return (
    // Conditionally render the Navbar based on the current route
    !isLoginOrSignup() && (
      <div className={`${isNavbarVisible ? 'navbar-container' : 'navbar-hidden'}`}>
        <div className="left-section">
          <button className="nav-button">AI HEALTH ASSESS</button>
        </div>
        <div className="center-section">
          <div className="dropdown">
            {!isLoggedIn && (
              <>
                <Link to="/" className="nav-button">Home</Link>
                <Link to="/about" className="nav-button">About us</Link>
                <Link to="/help" className="nav-button">Help</Link>
              </>
            )}
            {isLoggedIn && (
              <>
                <Link to="/getstarted" className="nav-button">Get Started</Link>
                <Link to="/heartdisease" className="nav-button">Heart Disease</Link>
                <Link to="/diabeties" className="nav-button">Diabeties</Link>
                <Link to="/Breast Cancer" className="nav-button">Breast Cancer</Link>
              </>
            )}
          </div>
        </div>
        <div className="right-section">
          {!isLoggedIn && (
              <>
                <Link to="/login" className="nav-button black-background">Login</Link>
                <Link to="/signup" className="nav-button white-background signup">Signup</Link>
              </>
            )}
            {isLoggedIn && (
              <>
                <Link className="nav-button white-background" onClick={openDialog}>Logout</Link>
              </>
            )}
        </div>
      </div>
    )
  );
};


export default Navbar;
