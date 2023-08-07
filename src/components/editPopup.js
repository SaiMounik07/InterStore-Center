import React, { useState } from 'react';
import './popup.css'
import './editPopup.css'
import { Button } from 'antd'; 
import axios from "axios";

const EditPopup = ({ isVisible, onClose,rowValue ,props,rowData}) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageName, setImageName] = useState('');
    const [imageNameError, setImageNameError] = useState('');
    const [isUpdatedNameEmpty, setIsUpdatedNameEmpty] = useState(false);

  if (!isVisible) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
 
    reader.onloadend = () => {
    setSelectedImage(reader.result);
    };
  
   if (file) {
    reader.readAsDataURL(file);
    }
    };

    const handleNameChange = (e) => {
      const value = e.target.value;
    setImageName(e.target.value);
    if (value.trim() === '') {
      setIsUpdatedNameEmpty(true);
      setImageNameError('Category name is required.');
    } else {
      setIsUpdatedNameEmpty(false);
      setImageNameError('');
    }
    };
  
    const handleImageUpload = async () => {
    try {
    if ( imageName.trim() === '') {
    console.error('Please select an image and provide a name.');
    return;
    }
    const response = await axios.put('http://localhost:8080/product/updateCategory', {
     categoryImage: selectedImage,
     categoryName:rowValue ,
     updatedCategoryName:imageName,
    });

    console.log('Image uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
   window.location.reload();
    };
    const isEditButtonDisabled = isUpdatedNameEmpty;

  return (
    <div className={`modal-container ${isVisible ? 'visible' : ''}`}>
      <div className="modal-content">
      <h3 className='header'>Edit Category</h3>
        <p className='container'>Enter the details to be edited</p>
        <input type="file"  onChange={handleImageChange} />
        <input type="text" placeholder="Category name" value={rowValue} readOnly onChange={handleNameChange}/>
        <input type="text" required placeholder="updatedName" value={imageName} onChange={handleNameChange}  />

        <Button className='button' value='submit' type="primary" danger onClick={handleImageUpload} disabled={isEditButtonDisabled}>Edit</Button>
        <Button className='button' type="primary" onClick={onClose}>Cancel</Button>
      </div>

      
    </div>
    
  );
};

export default EditPopup;
