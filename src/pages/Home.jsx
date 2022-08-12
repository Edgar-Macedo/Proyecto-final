import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Categories } from '../components/index';
import { getProductsThunk } from '../store/slices/Products.slice';
import { addToCartThunk } from '../store/slices/cart.slice';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';



const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const products = useSelector(state => state.products.products)

    const [categories, setCategories] = useState([])

    useEffect(() => {
        dispatch(getProductsThunk())
        
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => setCategories(res.data.data.categories))
    }, [])
  
    const addItem = (id,amount) => {
        const item = {
            id:id,
            quantity:amount
        }

        dispatch(addToCartThunk(item))
    }
    
    console.log(categories)

    return (
        <div className='container-page'>
            <aside>
                <Categories categories={categories}/>
            </aside>
            <div className='product-grid'>
                {
                    products?.map(product => (
                        <div
                            className="item"
                            key={product.id}
                            >

                            <Card style={{ width: '13.75rem' }}>
                                <img src={product.productImgs?.[0]} onClick={() => navigate(`/product/${product.id}`)} alt="product-image" className='card-img' style={{ cursor: "pointer" }} />
                                {/* <Card.Img variant="top" src={product.productImgs?.[0]}/> */}
                                <Card.Body >
                                    <h5 className='product-title'> {product.title} </h5>
                                    {/* <Card.Title>{product.title}</Card.Title> */}
                                    <Card.Text>
                                        ${product.price}
                                    </Card.Text>

                                    <Button 
                                        variant="primary"
                                        size='sm'
                                        className='button-add-cart'
                                        onClick={() => addItem(product.id,1)}
                                        >Add to cart</Button>
                                </Card.Body>
                                <Card.Footer className="text-muted">{product.status == "active" ? "In stock" : "Out of stock"}</Card.Footer>
                            </Card>
                        </div>

                    ))
                }
            </div>

        </div>
    );
};

export default Home;