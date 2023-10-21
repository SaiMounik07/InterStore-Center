import React, { useState } from 'react';
import {  useNavigate } from "react-router-dom";
import "./logout.css";
// import './Users/saimounik/center/src/components/popups/popup.css';
import { Button } from 'antd'; 
import AuthService from '../../auth/auth-service';
import axios from 'axios';
const Logout = ({ isVisible, onClose }) => {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

const navigate=useNavigate();
  if (!isVisible) return null;
  const handleDeleteConfirm = async() => {
    await axios.get("http://localhost:8080/member/logout",{
      headers:AuthService.getToken(),
    });
    localStorage.clear();
    setShowSuccessMessage(true);
    navigate("/login",{replace: true});
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000); 
    window.location.reload();
    onClose();
  };


  return (
    <div className={`modal-container ${isVisible ? 'visible' : ''}`}>
      <div className="modal-content">
      <h3 className='header'>Confirm Logout</h3>

        <p className='container'>Are you sure you want to logout?</p>
        <Button className='button' type="primary" danger onClick={handleDeleteConfirm}>Yes</Button>
        <Button className='button' type="primary" onClick={onClose}>No</Button>
      </div>
    
    </div>
  );
};

export default Logout;
