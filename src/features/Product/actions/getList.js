import axios from "axios"
export const getListProduct = async(currentPage) => {
    const url = `http://localhost:8000/api/products?${currentPage}`
    const products = axios.get(url)
                    .then(res => res.data);

    return products
}

// export const actionAddProduct = (data) =>{
//     const url = 'http://localhost:8000/api/products';

// } 