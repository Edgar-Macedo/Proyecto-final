import { createSlice } from '@reduxjs/toolkit';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart:(state, action) => {
            const cartItems =action.payload
            return cartItems
        }
    }
})

export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
        .then(res => dispatch(setCart(res.data.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
