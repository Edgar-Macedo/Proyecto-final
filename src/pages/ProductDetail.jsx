import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getProductsThunk } from '../store/slices/Products.slice';
import { Container, Badge, Button, Card } from 'react-bootstrap';
import { Categories, Carousel } from '../components/index';

import axios from 'axios';



const ProductDetail = () => {

    const allproducts = useSelector(state => state.products.products)
    const [productDetail, setProductDetail] = useState({})
    const [categories, setCategories] = useState([])
    const [sugestedProducts, setSugestedProducts] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        const products = allproducts?.find(getProduct =>
            getProduct.id === Number(id)
        )
        setProductDetail(products)

        const filteredPoducts = allproducts?.filter(getItem =>
            getItem.category.id === Number(products?.category.id)
        )
        setSugestedProducts(filteredPoducts)

    }, [allproducts, id])

    useEffect(() => {
        dispatch(getProductsThunk())

        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => setCategories(res.data.data.categories))
    }, [])



    return (

        <div className='container-page'>
            <aside>
                <Categories categories={categories} />
            </aside>
            <div className='product-container'>
                <div className="product-detail">
                    <div className="product-detail-img">
                        <img src={productDetail?.productImgs?.[0]} alt="" />
                    </div>
                    <div className="info">

                        <h4>{productDetail?.title}</h4>
                        <p>{productDetail?.description}</p>
                        <Badge bg="dark">{productDetail?.status === "active" ? "Available" : "Out of stock"}</Badge>
                        <div className="price">
                            <h2>${productDetail?.price} </h2>
                            <Button variant="primary">Add to cart</Button>
                        </div>
                    </div>
                </div>
                <h4>In the same category:</h4>
                <div className="featured">
                    {
                        sugestedProducts?.map(product => (
                            <div
                                className="item"
                                key={product.id}
                                onClick={() => navigate(`/product/${product.id}`)}>

                                <Card style={{ width: '13.75rem' }}>
                                    <img src={product.productImgs?.[0]} alt="product-image" className='card-img' style={{ cursor: "pointer" }} />

                                    <Card.Body >
                                        <h5 className='product-title'> {product.title} </h5>

                                        <Card.Text>
                                            ${product.price}
                                        </Card.Text>

                                        <Button variant="primary" size='sm' className='button-add-cart' >Add to cart</Button>
                                    </Card.Body>
                                    <Card.Footer className="text-muted">{product.status == "active" ? "In stock" : "Out of stock"}</Card.Footer>
                                </Card>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>

    );
};

export default ProductDetail;