import React, { useState } from "react";
import PropTypes from "prop-types";
import { updateProductAction } from "../../actions/updateProduct";
import { productState, updateProduct } from "../../productState";
import { useRecoilState } from "recoil";

ProductEdithtmlForm.propTypes = {
  dataUpdateProduct: PropTypes.object,
  closeModal: PropTypes.func,
};

function ProductEdithtmlForm(props) {
  const { dataUpdateProduct, closeModal } = props;
  const [name, setName] = useState(dataUpdateProduct.name);
  const [price, setPrice] = useState(dataUpdateProduct.price);
  const [description, setDescription] = useState(dataUpdateProduct.description);
  const [dataProducts, setDataProducts] = useRecoilState(productState);

  const handleCloseModal = () => {
    closeModal(false);
  };

  const submitUpdateProduct = async(dataProducts,productId,dataUpdate) => {
    const productStateUpdate = await updateProduct(
        dataProducts,
        productId,
        dataUpdate
      );
        console.log(productStateUpdate)
    setDataProducts(productStateUpdate)
}

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    const productId = dataUpdateProduct.id;

    const dataUpdate = {
      name,
      price,
      description,
    };

    submitUpdateProduct(dataProducts,productId,dataUpdate)
    closeModal(false);
  };

  return (
    <>
      <div className="modal">
        <div className="overlay"></div>
        <div className="modal-content">
          <h2 className="mb-8">Edit Product</h2>
          <div className="mb-6">
            <label
              htmlFor="default-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="default-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="default-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Price
            </label>
            <input
              type="number"
              id="default-input"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="default-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <input
              type="text"
              id="default-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div>
            <button onClick={handleSubmitUpdate}>submit</button>
          </div>

          <button className="close-modal" onClick={handleCloseModal}>
            CLOSE
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductEdithtmlForm;
