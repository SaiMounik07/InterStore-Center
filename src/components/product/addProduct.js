import { useEffect, useState } from "react";
import AuthService from "../../auth/auth-service";
import axios, { all } from "axios";
import { Button } from "antd";
import "./productDetail.css";
import { useNavigate } from "react-router-dom";
import LoaderIcon from "react-loader-icon";

import ErrorPopup from "../popups/errorPopup";
function AddProduct({onClose}){
    const [productId,setProductId]=useState();
    const [productName,setProductName]=useState(null);
    const [productDescription,setProductDescription]=useState(null);
    const [productImage,setProductImage]=useState(null);
    const [productOfferPrice,setProductOfferPrice]=useState(null);
    const [productListPrice,setProductListPrice]=useState(null);
    const[initialStocks,setInitialStocks]=useState(null);
    const[isActive,setIsActive]=useState(false);
    const [allCategories, setAllCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [showErrorPopup,setShowErrorPopup]=useState(false);
    const [message,setMessage]=useState(false);
    const[load,setLoad]=useState(false);

    const history = useNavigate();

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        if (selectedCategories.includes(value)) {
          setSelectedCategories((prevSelectedCategories) =>
            prevSelectedCategories.filter((category) => category !== value)
          );
        } else {
          setSelectedCategories((prevSelectedCategories) => [
            ...prevSelectedCategories,
            value,
          ]);
        }
      };
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
     
        reader.onloadend = () => {
        setProductImage(reader.result);
        };
      
       if (file) {
        reader.readAsDataURL(file);
        }
        };
    
      const handleAddProduct=async(e)=>{
        e.preventDefault();
        try{
            setLoad(true);
            const response=await axios.post(AuthService.getBaseUrl()+"/product/products",{
        
                productId:productId,
                productName:productName,
                productDescription:productDescription,
                productImage:productImage,
                productListPrice:parseFloat(productListPrice),
                productOfferPrice:parseFloat(productOfferPrice),
                categories:selectedCategories,
                initialStocks:parseInt (initialStocks),
                isActive:Boolean(isActive),
            },{
              headers:AuthService.getToken(),
            });
            
            
            if(response.data){
                setLoad(false);
                history("/product");
                setTimeout(() => {
                    setMessage(false);
                  }, 3000); 
            }
            console.log(response.data);
        }
        catch(error){
            console.log(error)
                setShowErrorPopup(true);
        }
      }
        const categoryResponse=async()=>{
            try {
              setLoad(true);
                const response = await axios.get(AuthService.getBaseUrl()+"/product/getCategories", {
                  headers: AuthService.getToken(),
                });
                setLoad(false);
                setAllCategories(response.data.value.map((category) => category.categoryName));
            } catch (error) {
                console.log(error);
              }
        }
        useEffect(() => {
            categoryResponse()
        }, []
        );
return(
    <div>
    <div className="popup">
        <form className="popup-inner" onSubmit={handleAddProduct}>
        <h3 className='header'>Add Product</h3><br></br>
            <div className="container">
            ProductId:<input type='text'
            placeholder="ProductId"
            onChange={(e) => setProductId(e.target.value)}
            className="short-input"
            required
            />
            Product Name:<input type='text'
            placeholder="ProductName"
            onChange={(e) => setProductName(e.target.value)}
            required
            />
            Product Description:<input type='text'
            placeholder="ProductDescription"
            onChange={(e) => setProductDescription(e.target.value)}
            
            />
            productOfferPrice:<input type='text'
            placeholder="productOfferPrice"
            onChange={(e) => setProductOfferPrice(e.target.value)}
            />
            productListPrice:<input type='text'
            placeholder="productListPrice"
            onChange={(e) => setProductListPrice(e.target.value)}
            required
            />
            initialStocks:<input type='text'
            placeholder="ProductId"
            onChange={(e) => setInitialStocks(e.target.value)}
            required
            />
            isActive:
            <label>
            <input
          type="radio"
          name="isActive"
          value="true"
          checked={isActive === "true"}
          onChange={(e) => setIsActive(e.target.value)}
        />
        Yes
      </label>
      <label>
        <input
          type="radio"
          name="isActive"
          value="false"
          checked={isActive === "false"}
          onChange={(e) => setIsActive(e.target.value)}
        />
        No
      </label>
      <br />
          select categories:<br/>
          {allCategories.map((category, index) => (
        <label key={index}> <br/>
          <input
            type="checkbox"
            value={category}
            checked={selectedCategories.includes(category)}
            onChange={handleCategoryChange}
          />
          {category}
        </label>
      ))}
      {
            load&&(<LoaderIcon color={"red"} />)
        }
      <br/>productImage:<input type="file"
                    
                      onChange={handleImageChange}
                        />

    <input className='submitBt' type="submit" value='submit'/ >
    <Button className='button' type="primary" onClick={onClose}>close</Button>
    </div> 
        </form>
    </div>
    </div>

);
}
export default AddProduct;