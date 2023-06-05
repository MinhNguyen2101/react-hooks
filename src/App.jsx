import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import ProductList from './ProductList';
import Pagination from './Pagination';
import queryString from 'query-string';
import ProductFormCreate from './ProductFormCreate';

function App() {

  const [productList,setProductList] = useState([]);
  const [deleteID, setDeleteID] = useState();
  const [pagination,setPagination] = useState({
    page:1,
    lastPage: 1,
  });
  const [filter,setFilter] = useState({
    page:1,
    deleteID,
    statusCreate:0,

  });

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
  },[filter]);


  // Delete Product
  
  function deleteProduct(productId){
    setDeleteID(productId);
    
  }

  useEffect( ()=>{
    if(deleteID){
      async function deleteProduct(){
        const url = await fetch(`http://127.0.0.1:8000/api/products/${deleteID}`,{method:'DELETE'});
        const newFilter = {
          ...filter,
        }
        setFilter(newFilter);
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
      ...filter,
      statusCreate:1,
    }
    setFilter(newFilter);
  }

  return (
    <>
    <ProductFormCreate  createProduct={getDataCreateProduct}/>
      <ProductList products={productList} deleteProduct={deleteProduct}/>
      <Pagination pagination={pagination} onClickPage={handlePagination}/>
    </>
  )
}

export default App
