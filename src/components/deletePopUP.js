import React, { useState } from 'react';
import './popup.css'
import { Button } from 'antd'; 
const DeletePopUp = ({ isVisible, onClose, onDelete }) => {

  if (!isVisible) return null;

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <div className={`modal-container ${isVisible ? 'visible' : ''}`}>
      <div className="modal-content">
      <h3 className='header'>Confirm Deletion</h3>

        <p className='container'>Are you sure you want to delete?</p>
        <Button className='button' type="primary" danger onClick={handleDelete}>Yes</Button>
        <Button className='button' type="primary" onClick={onClose}>No</Button>
      </div>
    
    </div>
  );
};

export default DeletePopUp;
