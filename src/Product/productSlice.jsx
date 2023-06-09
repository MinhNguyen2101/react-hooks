import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    products : [],
    errors: '',
}

export const fetchProduct = createAsyncThunk ('product/getList',async() =>{
    return axios.get('http://localhost:8000/api/products')
        .then(res => res.data);
});

const product = createSlice({
    name:'product',
    initialState,
    extraReducers : (builder) => {
        builder  
            .addCase(fetchProduct.getList,(state,actions) => {
                state.products = actions.payload
            })
    }
});

const {reducer,actions} = product;
console.log(product);
export const {addProduct} = actions.addProduct;

export default reducer;