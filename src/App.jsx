import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import ProductList from './ProductList';
import Pagination from './Pagination';
import queryString from 'query-string';
import ProductFormCreate from './ProductFormCreate';
import ProductFormEdit from './assets/ProductFormEdit';

function App() {

  const [productList,setProductList] = useState([]);
  const [deleteID, setDeleteID] = useState();
  const [pagination,setPagination] = useState({
    page:1,
    lastPage: 1,
  });
  const [filter,setFilter] = useState({
    page:1,
  });
  const [statusAction,setStatusAction] = useState();

  function handlePagination(newPage)
  {
    const newFilter = {
      ...filter,
      page : newPage,
    }
    setFilter(newFilter);
  }
  

  useEffect( ()=>{
    async function getListProducts(){
      const params = queryString.stringify(filter);

      const url = `http://127.0.0.1:8000/api/products?${params}`;
      const responese = await fetch(url);
      const responeJson = await responese.json();
      const data = responeJson.data.data;
      const lastPage = responeJson.data.last_page;
      const currentPage = responeJson.data.current_page;

      setProductList(data);

      const newPagination = {
        ...pagination,
        'page' : currentPage,
        'lastPage':lastPage,
      };

      setPagination(newPagination);
    }

    getListProducts();

      

  },[filter,statusAction]);


  // Delete Product
  
  function deleteProduct(productId){
    setDeleteID(productId);
  }

  useEffect( ()=>{
    if(deleteID){
      async function deleteProduct(){
        await fetch(`http://127.0.0.1:8000/api/products/${deleteID}`,{method:'DELETE'});

        const newFilter = {
          ...statusAction,
        }
        setStatusAction(newFilter);
      }
      deleteProduct();
    }

  },[deleteID]);

  // Create Product
  const [dataProduct,setDataProduct] = useState();
  function getDataCreateProduct(data){

    fetch('http://127.0.0.1:8000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const newFilter = {
      ...statusAction,
    }
    setStatusAction(newFilter);

  }

  // Update Product
  const [dataUpdate,setDataUpdate] = useState({});
  const [modal,setModal] = useState(false);

  function getDataProduct(product){
    setDataUpdate(product);
    setModal(true);
  }

  function updateProduct(product){
    async function update(){
      const productID = product['id'];
      delete product["id"];
      const url = `http://127.0.0.1:8000/api/products/${productID}`;
      const responese = await fetch(url,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });
    } 
    update();
    setModal(false);
    const newStatus = {
      ...statusAction,
      status:1,
    };
    

    setStatusAction(newStatus);
  }
  console.log(statusAction);

 
  return (
    <>
    <ProductFormCreate createProduct={getDataCreateProduct} updateData = {dataUpdate} />
      <ProductList products={productList} deleteProduct={deleteProduct} editProductFunc={getDataProduct} />
      <Pagination pagination={pagination} onClickPage={handlePagination}/>
      {modal &&(
        <ProductFormEdit dataUpdate={dataUpdate} updateProduct={updateProduct}/>
        
      )}
      
    </>
  )
}

export default App
