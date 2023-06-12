import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRecoilState } from "recoil";
import { getListProduct } from "../../actions/getList";
import { productState } from "../../productState";
import { deleteProduct } from "../../actions/deleteProduct";
import { updateProductAction } from "../../actions/updateProduct";

ProductList.propTypes = {
    setStatus:PropTypes.func,
};

function ProductList(props) {
    const {setStatus} = props
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useRecoilState(productState);
  const [modal,setModal] = useState(false)
    // get List Product
  const getProductList = async (currentPage) => {
    const listProduct = await getListProduct(currentPage);
    setProducts(listProduct.data.data);
  };
  useEffect(() => {
    getProductList(currentPage);
  }, [currentPage]);

//   Delete Product
  const handleDeleteProduct = (productID) => {
        deleteProduct(productID)
  }
  
//   Get data for update
  const handleUpdateProduct = (product) => {
    setStatus(true,product)
  }
  
  return (
    <div>
      <table className="table-fixed">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Descrioption</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {products.map(product => (
                <tr key={product.id}>
                    <td> {product.id} </td>
                    <td> {product.name} </td>
                    <td> {product.price} </td>
                    <td> {product.description} </td>
                    <td>
                        <div>
                            <button onClick={() => handleUpdateProduct(product)}>EDIT</button>
                            <button onClick={() => handleDeleteProduct(product.id)}>DELETE</button>
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
