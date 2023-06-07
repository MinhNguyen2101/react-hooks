import React from 'react';
import PropTypes from 'prop-types';

ProductList.propTypes = {
    products: PropTypes.array,
    deleteProduct: PropTypes.func,
    editProductFunc: PropTypes.func,
};

ProductList.defaultProps = {
    products: [],
    deleteProduct: null,
    editProductFunc:null
}

function ProductList(props) {
    const {products,deleteProduct,editProductFunc} = props;

    function handelClickDelete(id){

        deleteProduct(id)
    }

    function handelClickEdit(product){
        editProductFunc(product);
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Image</td>
                        <td>Name</td>
                        <td>Description</td>
                        <td>Createed at</td>
                        <td>Action</td>
                    </tr>

                </thead>

                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td> {product.image} </td>
                            <td>{product.name}</td>
                            <td> {product.description} </td>
                            <td> {product.created_at} </td>
                            <td>
                                <div>
                                <button onClick={()=>handelClickEdit(product)}> EDIT </button>
                                    <button onClick={()=>handelClickDelete(product.id)}> Delete </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    <tr>

                    </tr>
                </tbody>
            </table> 
        </>
    );
}

export default ProductList;