import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import ProductList from './ProductList';
import Pagination from './Pagination';
import queryString from 'query-string';
import ProductFormCreate from './ProductFormCreate';
import ProductFormEdit from './assets/ProductFormEdit';

function App() {

  const [productList, setProductList] = useState([]);
  const [deleteID, setDeleteID] = useState();

  const [statusAction, setStatusAction] = useState();

  const [currentPage, setCurrentPage] = useState(1)


  function handlePagination(newPage) {
  
    setCurrentPage(newPage)
  }

  const getListProducts = async () => {
    const dataPost = {
      page: currentPage
    }
    const params = queryString.stringify(dataPost);

    const url = `http://127.0.0.1:8000/api/products?${params}`;
    const responese = await fetch(url);
    const responeJson = await responese.json();
    console.log(responeJson)

    setProductList(responeJson.data);
  }

  useEffect(() => {
    getListProducts();
  }, [currentPage]);


  // Delete Product

  function deleteProduct(productId) {
    setDeleteID(productId);
  }

  useEffect(() => {
    if (deleteID) {
      async function deleteProduct() {
        await fetch(`http://127.0.0.1:8000/api/products/${deleteID}`, 
        { 
          method: 'DELETE' 
        }).then((res)=> {
          if(res.status ===200){
            getListProducts();
          }
        });
      }
      deleteProduct();
    }

  },[deleteID]);

  // Create Product
  // const [dataProduct, setDataProduct] = useState();
  function getDataCreateProduct(data) {

    fetch('http://127.0.0.1:8000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res)=>{
      if(res.status === 200){
        getListProducts();
      }
    });
  }

  // Update Product
  const [dataUpdate, setDataUpdate] = useState({});
  const [modal, setModal] = useState(false);

  function getDataProduct(product) {
    setDataUpdate(product);
    setModal(true);
  }

  function updateProduct(product) {
    async function update() {
      const productID = product['id'];
      delete product["id"];
      const url = `http://127.0.0.1:8000/api/products/${productID}`;
      const responese = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      }).then((res) => {
        if (res.status === 200) {
          getListProducts()
        }
      });
    }

    update();
    setModal(false);
  }


  return (
    <>
      <ProductFormCreate createProduct={getDataCreateProduct} updateData={dataUpdate} />
      <ProductList products={productList?.data} deleteProduct={deleteProduct} editProductFunc={getDataProduct} />
      <Pagination lastPage={productList.last_page} currentPage={productList.current_page} onClickPage={handlePagination} />
      {modal && (
        <ProductFormEdit dataUpdate={dataUpdate} updateProduct={updateProduct} />

      )}

    </>
  )
}

export default App
