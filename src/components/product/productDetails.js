import React from "react";
import './productDetail.css';
import { Button } from 'antd'; 

function ProductDetail({ product,onclose }){
return(
<div className="popup">
      <div className="popup-inner">
      <h3 className='header'>Product Details</h3>
        <table>
          <tbody>
          <tr>
              <td>Product ID</td>
              <td>{product.productId}</td>
            </tr>
          <tr>
              <td>Product Name</td>
              <td>{product.productName}</td>
            </tr>
            <tr>
              <td>Product Description</td>
              <td>{product.productDescription}</td>
            </tr>
            <tr>
              <td>Product List Price</td>
              <td>{product.productListPrice}</td>
            </tr>
            
            <tr>
              <td>Product Offer Price</td>
              <td>{product.productOfferPrice}</td>
            </tr>
            <tr>
              <td>Is Active</td>
              <td>{product.isActive ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <td>Is Out of Stock</td>
              <td>{product.isOutOfStock ? 'Yes' : 'No'}</td>
            </tr>
            
            <tr>
                <td>Available categories</td>
                <td><ul>
                  {product.categories.map((category) => (
                    <li key={category.id}>
                      {category.categoryName}
                    </li>
                  ))}
                </ul></td>
            </tr>
          </tbody>
         
        </table>
        <Button className='button' type="primary" onClick={onclose}>Ok</Button>

      </div>
    </div>
);
}
export default ProductDetail;