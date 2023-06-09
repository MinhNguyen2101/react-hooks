export const deleteProduct = (deleteID) => {
    fetch(`http://127.0.0.1:8000/api/products/${deleteID}`, 
       { 
         method: 'DELETE' 
       }).then((res)=> {
         if(res.status ===200){
           getListProducts();
         }
       });
    }