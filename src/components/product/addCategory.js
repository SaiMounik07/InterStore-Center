import React, { useState } from 'react';
import { Button } from 'antd'; 
import axios from "axios";
import AuthService from '../../auth/auth-service';

function AddCategory({ isVisible, onClose,rowValue ,props,rowData}){
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
    if ( imageName.trim() === ''||selectedImage===null) {
    console.error('Please select an image and provide a name.');
    return;
    }
    const response = await axios.post('http://localhost:8080/product/category', {
    categoryName:imageName, 
    categoryImage: selectedImage,
    },{
        headers: AuthService.getToken(),
    }
    );

    console.log('Image uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
   window.location.reload();
    };
    const isEditButtonDisabled = isUpdatedNameEmpty;

  return (
    <div className={`modal-containers ${isVisible ? 'visible' : ''}`}>
      <div className="modal-content">
      <h3 className='header'>Add Category</h3>
        <p className='container'>Enter the details</p>
        <input type="file"  onChange={handleImageChange} />
        <input type="text" required placeholder="Category Name" value={imageName} onChange={handleNameChange}  />
        <Button className='button' value='submit' type="primary" danger onClick={handleImageUpload} disabled={isEditButtonDisabled}>Edit</Button>
        <Button className='button' type="primary" onClick={onClose}>Cancel</Button>
      </div>

      
    </div>
    
  );
}
export default AddCategory;