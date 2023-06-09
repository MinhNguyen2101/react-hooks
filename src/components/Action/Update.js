import { getListProduct } from "./GetList";

export const updateProducts = (product,getList,currentPage) => {
    console.log(product)
    const productID = product['id'];
    delete product["id"];
    const url = `http://127.0.0.1:8000/api/products/${productID}`;
    fetch(url, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    }).then((res) => {
      if (res.status === 200) {
        getList(currentPage)
      }
    })
}