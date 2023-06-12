import axios from "axios"

export const updateProductAction = async(productID,data) => {
    const resultUpdate = await axios.post(`http://localhost:8000/api/products/${productID}`,{
        name : data.name,
        price: data.price,
        description: data.description,
    })
    return resultUpdate.data.data;
}