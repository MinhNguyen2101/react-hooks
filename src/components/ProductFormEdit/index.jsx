import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { updateProducts } from '../Action/Update';

ProductFormEdit.propTypes = {
    propsUpdate: PropTypes.object,
    // dataUpdate:PropTypes.object,
    // listProduct: PropTypes.func,
    // currentPage: PropTypes.number,
    // setStatusModal: PropTypes.func
};

ProductFormEdit.defaultProps = {
    // dataUpdate:{},
    // listProduct: [],
    // setStatusModal:null
}

function ProductFormEdit(props) {
    console.log(props.propsUpdate.dataUpdate);
    const dataUpdate = props.propsUpdate.dataUpdate;
    const listProduct = props.propsUpdate.listProduct;
    const currentPage = props.propsUpdate.currentPage;
    const setStatusModal = props.propsUpdate.setStatusModal
    console.log(dataUpdate);
    // const {dataUpdate,listProduct,currentPage,setStatusModal} = props;
    const [name,setName] = useState(dataUpdate.dataUpdate.name);
    const [description,setDescription] = useState(dataUpdate.dataUpdate.description);
    const [price,setPrice] = useState(dataUpdate.dataUpdate.price);

    const updateProduct = (product) => {
        const dataEditProduct = {
                    'id' : dataUpdate.id,
                    'name':name,
                    'description' : description,
                    'price' : price,
                };

        updateProducts(dataEditProduct,listProduct,currentPage);
        setStatusModal(false);
        setName('');
        setDescription('');
        setPrice('');
      }



    // function handlEditProduct(e){
    //     e.preventDefault();

    //     const dataEditProduct = {
    //         'id' : dataUpdate.id,
    //         'name':name,
    //         'description' : description,
    //         'price' : price,
    //     };
    //     updateProduct(dataEditProduct);
    //     setName('');
    //     setDescription('');
    //     setPrice('');
    // }

    return (
        <>
            <div className="modal">
                <div className="overlay"></div>
                <div className="modal-content">
                    <h2>Edit Product</h2>
                    <div>
                        <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <input type="text" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div>
                        <input type="text" placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div>
                        <button onClick={updateProduct}>submit</button>
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