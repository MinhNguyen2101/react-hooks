import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

ProductFormCreate.propTypes = {
    createProduct: PropTypes.func,
};

ProductFormCreate.defaultProps = {
    createProduct:null,
}

function ProductFormCreate(props) {
    const dataUpdate = props.updateData;
    const {createProduct} = props;
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState('');


    function addProduct(e){
        e.preventDefault();
        const dataCreateProduct = {
            'name':name,
            'description' : description,
            'price' : price,
        };
        createProduct(dataCreateProduct);
        setName('');
        setDescription('');
        setPrice('');
    }

    return (
        <>
            <form>
                <div style={{display:'block',}}>
                    <input type="text" style={{fontSize: '20px'}} placeholder={'Name'} value={name} onChange={(e)=>setName(e.target.value)}/>
                    <input type="text" style={{fontSize: '20px'}} placeholder={'Description'} value={description} onChange={(e)=>setDescription(e.target.value)} />
                </div>
                <div style={{display:'block'}}>
                    <input type="number" style={{fontSize: '20px'}} placeholder={'Price'}value={price} onChange={(e)=>setPrice(e.target.value)} />
                </div>
                <button onClick={addProduct}>Create</button>
            </form>
        </>
    );
}

export default ProductFormCreate;