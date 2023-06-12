import { atom } from "recoil";
import { createProductAction } from "./actions/createProduct";
import { updateProductAction } from "./actions/updateProduct";

export const productState = atom({
    key:'productState',
    default:[]
});

export const addProduct = async(products,data)=>{
    const resultCreate = await createProductAction(data);
    const newProducts = [...products]
    newProducts.unshift(
        resultCreate
        )
    return newProducts
}

export const updateProduct = async(products,productId,data)=>{
    console.log(productId)
    const resultUpdate = await updateProductAction(productId,data);
    
    const updateSate = products.map((product) =>{
        if(product.id === productId){
            return  {...product,
                name: resultUpdate.name,
                price: resultUpdate.price,
                description: resultUpdate.description
            }
        }
        return product
    })

    return updateSate
}
