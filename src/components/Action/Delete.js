import { getListProduct } from "./GetList";

export const deleteProducts = (deleteId,getList,currentPage) => {
    fetch(`http://127.0.0.1:8000/api/products/${deleteId}`, 
    { 
        method: 'DELETE' 
    }).then((res)=> {
        getList(currentPage)
    });
}