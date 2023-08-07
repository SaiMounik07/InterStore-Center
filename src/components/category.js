import './category.css';
import './popup.css';
import React, { useState, useEffect } from "react"
import { AiOutlineSetting } from "react-icons/ai";
import { Dropdown, Space, Table,Button } from 'antd';
import DeletePopUp from './deletePopUP';
import EditPopup from './editPopup';
import axios from "axios";
import AddCategory from './addCategory';

let dummy = ''

const column2 = [
    {
        title: "Product Name",
        dataIndex: "productName",
        render: text => <a>{text}</a>
    },
    {
        title: "Product Description",
        dataIndex: "productDescription",
        render: text => <a>{text}</a>
    },
    {
        title: "price",
        dataIndex: "productOfferPrice",
        render: text => <a>{"Rs " + text}</a>
    }
]

function Category() {
    const [products, setProducts] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showEditPopup,setShowEditPopup]=useState(false);
    const [categories, setCategories] = useState([]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [rowData,setRowData]=useState(null);
    const [showAddPopup,setShowAddPopup]=useState(false);


//util functions
const handleRow = (rowData) => {
    return {
        onClick: () => {
            dummy = rowData.categoryName
        }
    }
}
const handleEditPopup=()=>{
    setShowEditPopup(true);
}
const handleEdit=(rowData)=>{
    
   setRowData(rowData.categoryName);
   console.log(rowData.categoryName);
};



const handleDeleteClick = () => {
    setShowPopup(true);
  };
const handlePopupClose = () => {
    setShowPopup(false);
    setShowEditPopup(false);
  };

  useEffect(() => {
    loadCategories()
}, []
);


const addCategory=(e)=>{
    e.preventDefault();
    setShowAddPopup(true);
}
const closePopup=()=>{
    setShowAddPopup(false);
}

  //api calls
  const handleDeleteConfirm = async() => {
      await axios.delete("http://localhost:8080/product/category/"+dummy);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000); 
      window.location.reload();

    };
  
    const AvailProducts = async () => {        
        const result = await axios.get("http://localhost:8080/product/category/"+dummy);
        setProducts(result.data.products);
    }

    const loadCategories = async () => {
        const result = await axios.get("http://localhost:8080/product/getCategories");
        setCategories(result.data);
    }
    

//objects  
const items = [
    {
        key: '1',
        label: (<a onClick={AvailProducts} >Available products</a>)
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
        title: "category name",
        dataIndex: "categoryName",
        render: text => <a>{text}</a>
    },
    {
        title: "category code",
        dataIndex: "categoryCode",

    },
    {
        title: "Action",
        dataIndex: "categoryName",
        key: "action",
        render: (_, record) => (
            <Space size="middle">
                <Dropdown menu={{ items }}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <AiOutlineSetting onClick={() => handleEdit(record)}/>
                        </Space>
                    </a>
                </Dropdown>
            </Space>
        )
    }
]

    return (
        <div>
        <div className="Rectangle">

            <div className='row' >
                <div className="tables">Category</div>
            </div>
            <div className='category'>
                     <Button className='addCategory' onClick={addCategory}>Add Category</Button>
                </div>
            <div className='container'>
                <div className='column1'>
                    <Table columns={column1} dataSource={categories} pagination={false} onRow={handleRow} />
                </div>
                
                <div className='column2'>
                    <div className='product-contents'>
                        <Table columns={column2} dataSource={products} pagination={false} />
                    </div>
                </div>
                
            </div>
            
            </div>
            <div >
            <AddCategory 
                    className='add'
                    isVisible={showAddPopup}
                    onClose={closePopup}
                 />
                 </div>
                 {showPopup && (
                <DeletePopUp isVisible={showPopup} onClose={handlePopupClose} onDelete={handleDeleteConfirm} />
                 )}
                 <div className='successMessage'>
                 {showSuccessMessage && (
             <div className="success-message">Successfully deleted!</div>
             )}
                 </div>
                 
                {showEditPopup && (
                 <EditPopup isVisible={showEditPopup} onClose={handlePopupClose} rowValue={dummy} />
                 )}
            
           
            
             <div>
  
  {/* {selectedImage && <img src={selectedImage} alt="Uploaded" />} */}
 </div>

 
        </div>
    );
}
export default Category;