import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import ProductList from './components/ProductList';
import Pagination from './components/Pagination';
import ProductFormCreate from './components/ProductFormCreate';
import ProductFormEdit from './components/ProductFormEdit';
import { getListProduct } from './components/Action/GetList';
import { deleteProducts } from './components/Action/Delete';
import { updateProducts } from './components/Action/Update';

function App() {

  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [dataUpdate, setDataUpdate] = useState({});
  const [modal, setModal] = useState(false);

  const handlePagination = (newPage) => {
    setCurrentPage(newPage)
  }

  const getList = async (currentPage) => {
    const result = await getListProduct(currentPage);
    setProductList(result.data);
  }

  useEffect(() => {
    getList(currentPage);

  }, [currentPage]);

  // Delete Product
  const deleteProduct = (deleteID) => {
    deleteProducts(deleteID, getList);
  }

  // Create Product
  function getDataCreateProduct(data) {

    fetch('http://127.0.0.1:8000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      if (res.status === 200) {
        getListProducts();
      }
    });
  }


  // Update Product


  const getDataProduct = (product) => {
    setDataUpdate(product);
    setModal(true);
  }

  const setStatusModal = (status) => {
    setModal(status)
  }
  const propsUpdate = {
    'dataUpdate': { dataUpdate },
    'listProduct': { getList },
    'currentPage': { currentPage },
    'setStatusModal': { setStatusModal },
  }




  return (
    <>
      <ProductFormCreate createProduct={getDataCreateProduct} updateData={dataUpdate} />
      <ProductList products={productList?.data} deleteProduct={deleteProduct} editProductFunc={getDataProduct} />
      <Pagination lastPage={productList.last_page} currentPage={productList.current_page} onClickPage={handlePagination} />
      {modal && (
        <ProductFormEdit
            propsUpdate = {propsUpdate}
          // dataUpdate={dataUpdate}
          // listProduct={getList}
          // currentPage={currentPage}
          // setStatusModal={setStatusModal}
        />

      )}

    </>
  )
}

export default App
