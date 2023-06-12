import axios from "axios"

export const createProductAction = (data) => {
    return axios.post('http://localhost:8000/api/products',{
      'name': data.name,
      'price': data.price,
      'description':data.description
    }).then(res =>res.data.data)
    .catch(err => err)
}