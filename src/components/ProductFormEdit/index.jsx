import React, { useState } from 'react';
import PropTypes from 'prop-types';

ProductFormEdit.propTypes = {
    dataUpdate:PropTypes.object,
    updateProduct : PropTypes.func,
};

ProductFormEdit.defaultProps={
    dataUpdate:{},
    updateProduct: null
}

function ProductFormEdit(props) {
    const {dataUpdate,updateProduct} = props;
    const [name,setName] = useState(dataUpdate.name);
    const [description,setDescription] = useState(dataUpdate.description);
    const [price,setPrice] = useState(dataUpdate.price);

    function handlEditProduct(e){
        e.preventDefault();

        const dataEditProduct = {
            'id' : dataUpdate.id,
            'name':name,
            'description' : description,
            'price' : price,
        };
        updateProduct(dataEditProduct);
        setName('');
        setDescription('');
        setPrice('');
    }

    return (
        <>
            <div className="modal">
                <div  className="overlay"></div>
                <div className="modal-content">
                    <h2>Edit Product</h2>
                    <div>
                        <input type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div>
                        <input type="text" placeholder='Description' value={description} onChange={(e)=>setDescription(e.target.value)} />
                    </div>
                    <div>
                        <input type="text" placeholder='Price' value={price} onChange={(e)=>setPrice(e.target.value)} />
                    </div>
                    <div>
                        <button onClick={handlEditProduct}>submit</button>
                    </div>
                    
                    <button className="close-modal" >
                    CLOSE
                    </button>
                </div>
            </div>
        </>
    );
}

export default ProductFormEdit;