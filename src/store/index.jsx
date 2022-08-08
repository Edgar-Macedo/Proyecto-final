import { configureStore } from '@reduxjs/toolkit'
import isLoadingSlice from './slices/isLoading.slice'
import ProductsSlice from './slices/Products.slice'


export default configureStore({
    reducer: {
        isLoading: isLoadingSlice,
        products: ProductsSlice
    }
})
