import axios from "axios"

export const deleteProduct = async(productId) => {
    const resultDelete = await axios.delete(`http://localhost:8000/api/products/${productId}`)
}