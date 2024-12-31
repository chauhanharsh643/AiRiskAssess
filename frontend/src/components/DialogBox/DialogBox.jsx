import React, { useState } from 'react';
import './DialogBox.css'
import { RecoilRoot, useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { dialogAtom } from '../../atom/dialogAtom';
import { useNavigate } from 'react-router-dom';
import { loginAtom } from '../../atom/loginAtom';

const DialogBox = () => {
  const [isOpen, setIsOpen] = useRecoilState(dialogAtom);
  const setLogginState = useSetRecoilState(loginAtom);

  const closeDialog = () => {
    setIsOpen(false);
  };

  const navigate = useNavigate();
  const logout = () => {
    setIsOpen(false);
    setLogginState(false);
    navigate('/');
  };
  return (
    <div>
    {isOpen && (
    <div className="dialogContainer">
      <div className='dialog'>
        {/* <button onClick={openDialog}>Open Dialog</button> */}
          
              <h2>AI HEALTH ASSESS </h2>
              <p>Are you sure you want to log out.</p>
              <div className="button-container">
                <button onClick={closeDialog}>NO</button>
                <button onClick={logout}>YES</button>
              </div>
            
      </div>
    </div>
  )}
  </div>
  );
};

export default DialogBox;
