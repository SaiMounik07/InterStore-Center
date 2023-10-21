import { Dropdown, Space, Table,Button } from 'antd';
import { AiOutlineSetting } from "react-icons/ai";
import { useState } from 'react';
import axios from 'axios';
import AuthService from '../../auth/auth-service';
import ErrorPopup from '../popups/errorPopup';
import { useEffect } from 'react';
import { useAsyncError, useNavigate } from "react-router-dom";
import ProductDetail from './productDetails';
import AddProduct from './addProduct';
import DeletePopUp from '../popups/deletePopUP';


let name = '';
let id='';

function Product(){
    const history = useNavigate();

    const [showEditPopup,setShowEditPopup]=useState();
    const [rowData,setRowdata]=useState();
    const [errorMessage,setErrorMessage]=useState();
    const [showErrorPopup,setShowErrorPopup]=useState();
    const [productDetails,setProductDetails]=useState();
    const [showDetails,setShowDetails]=useState(false);
    const [rowValue,setRowValue]=useState(false)
    const [showAdd,setShowAdd]=useState();
    const [deletePopUP,setDeletePopup]=useState(false);

    useEffect(() => {
        products()
    }, []
    );
    const openAddProduct=()=>{
        setShowAdd(true);
    }
    const closeAddProduct=()=>{
        setShowAdd(false);
    }
    const closePopup=()=>{
        setDeletePopup(false);
    }
    const handleDelete=async()=>{
        try{
            const result=await axios.delete(AuthService.getBaseUrl()+"/product/"+id,{
              headers:AuthService.getToken(),
            });
            if(result.data)
                window.location.reload();
          }catch{
              setShowErrorPopup(true);
              setErrorMessage('unable to delete');
      
          }
    }
    const addProduct=()=>{

    }
    const products = async () => {
        try {
          const response = await axios.get(AuthService.getBaseUrl()+"/product/getProducts", {
            headers: AuthService.getToken(),
          });
      
          if (response.status === 200 && response.data.value !== "EMPTY_VALUE") {
            setProductDetails(response.data.value);
          } else {
            setShowErrorPopup(true);
            setErrorMessage('no products, please add category');

          }
        } catch (error) {
          setShowErrorPopup(true);
          setErrorMessage('System Error');
          console.error("Error loading products:", error);
        }
      };
    const showProductDetail=()=>{
        setShowDetails(true);
    }
    const closeDetails=()=>{
        setShowDetails(false);
    }
    const handleEditPopup=()=>{
        setShowEditPopup(true);
    }
    const handleDeleteClick=()=>{
        setDeletePopup(true);
    }
    const showErrorPopups=()=>{
        setShowErrorPopup(true);
        }
        const closeErrorPopup=()=>{
            setShowErrorPopup(false);
            localStorage.clear();
            history("/login");
            window.location.reload();
            
        }
    const handleEdit=(rowData)=>{
    
        setRowdata(rowData.productName);
        console.log(rowData.productName);
     };
     const handleRow = (rowData) => {
        return {
            onClick: () => {
                name = rowData.productName;
                id=rowData.productId;
            }
        }
    }
    const items = [
        {
            key: '1',
            label: (<a onClick={showProductDetail} > Details</a>)
        },
        {
            key: '2',
            label: (<a onClick={handleEditPopup}>Edit</a>)
        },
        {
            key: '3',
            label: (<a onClick={handleDeleteClick}>Delete</a>)
        }
    ];
    const column1 = [
        {
            title: "Product Id",
            dataIndex: "productId",
            render: text => <a>{text}</a>
        },
        {
            title: "Product Name",
            dataIndex: "productName",
    
        },
        {
            title: "Action",
            dataIndex: "productName",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Dropdown menu={{ items }}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <AiOutlineSetting onClick={() => (setRowValue(record))}/>
                            </Space>
                        </a>
                    </Dropdown>
                </Space>
            )
        }
    ]
    return(
        <div>
        <div className='row' >
                <div className="tables">Product</div>
            </div>
            <div className='category'>
            <Button className='addCategory' onClick={openAddProduct}>Add Product</Button>
       </div>
   <div className='container'>
       
       <div className='column1'>
           <div className='product-contents'>
               <Table columns={column1} dataSource={productDetails} pagination={true} onRow={handleRow}/>
           </div>
       </div>
       {
        showDetails&&(
            <ProductDetail product={rowValue} onclose={closeDetails}/>
        )
       }
       {
            showErrorPopup &&(
                 <ErrorPopup isVisible={showErrorPopups} onClose={closeErrorPopup} name={errorMessage}/>
                    )
                 }

                 {
                    showAdd&&(
                        <AddProduct onClose={closeAddProduct}/>
                    )
                 }

                {
                    deletePopUP&&(
                        <DeletePopUp isVisible={deletePopUP} onClose={closePopup} onDelete={handleDelete}/>
                    )
                }
       </div>
       
   </div>

    );
}
export default Product;