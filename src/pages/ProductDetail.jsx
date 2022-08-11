import React, { useEffect, useState  } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getProductsThunk } from '../store/slices/Products.slice';
 
const ProductDetail = () => {

    const allproducts = useSelector(state => state.products.products)
    const [ProductDetail , setProductDetail] = useState({})

    const dispatch = useDispatch()

    const {id} = useParams()

    useEffect(() => {
        const products = allproducts?.find(getProduct => getProduct.id === Number(id))
        setProductDetail(products)
    },[allproducts])
    
    useEffect(() => {
        dispatch(getProductsThunk())
    },[])

    
    return (
        <div>
            <h1>Product Detail</h1>
        </div>
    );
};

export default ProductDetail;