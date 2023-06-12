import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import ProductList from './components/ProductList';
import ProductFormCreate from './components/ProductCreateForm';
import ProductEditForm from './components/ProductEditForm';

Product.propTypes = {
    
};

function Product(props) {
    const [modal,setModal] = useState(false);
    const [dataUpdate,setDataUpdate] = useState([]);

    const formUpdateProduct = (status,dataUpdate) => {
        setModal(status);
        setDataUpdate(dataUpdate)
    };

    const setCloseModal = (status) => {
        setModal(status);
    }
   
    return (
        <>
            <h1 className="text-3xl font-bold underline" > Danh sách Product</h1>
            <ProductFormCreate/>
            <ProductList setStatus={formUpdateProduct}/>
            {modal && (
                <ProductEditForm dataUpdateProduct = {dataUpdate} closeModal={setCloseModal}/>
            ) }
        </>
    );
}

export default Product;