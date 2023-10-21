import React, { useState } from 'react';
import './popup.css';
import { Button } from 'antd'; 
const ErrorPopup = ({ isVisible, onClose,name }) => {

  if (!isVisible) return null;


  return (
    <div className={`modal-container ${isVisible ? 'visible' : ''}`}>
      <div className="modal-content">
      <h3 className='header'>Error</h3>

        <p className='container'>{name}</p>
        <Button className='button' type="primary" onClick={onClose}>Ok</Button>
      </div>
    
    </div>
  );
};

export default ErrorPopup;
