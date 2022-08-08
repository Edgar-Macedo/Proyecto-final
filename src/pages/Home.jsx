import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getProductsThunk, filterProductThunk } from '../store/slices/Products.slice';

import Card from 'react-bootstrap/Card';
//import Search from '../components/Search';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';


const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const products = useSelector(state => state.products.products)

    const [searchValue, setSearchValue] = useState("")

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [])

    // useEffect(() => {
    //     dispatch(filterProductThunk(searchValue))
    // },[searchValue])

    console.log(searchValue)

    return (
        <div className='container-page'>
            <aside>
                <h1>Home</h1>
                <InputGroup size="sm" className="mb-3" >
                    <Form.Control
                        placeholder="Search"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"

                        onChange={e => setSearchValue(e.target.value)}
                        value={searchValue}
                    />
                    <Button variant="light" id="button-addon2"
                        onClick={() => dispatch(filterProductThunk(searchValue))}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </Button>
                </InputGroup>

            </aside>
            <div className='product-grid'>
                {
                    products?.map(product => (
                        <div
                            className="item"
                            key={product.id}
                            onClick={() => navigate(`/product/${product.id}`)}>

                            <Card style={{ width: '13.75rem' }}>
                                <img src={product.productImgs?.[0]} alt="product-image" className='card-img' style={{ cursor: "pointer" }} />
                                {/* <Card.Img variant="top" src={product.productImgs?.[0]}/> */}
                                <Card.Body >
                                    <h5 className='product-title'> {product.title} </h5>
                                    {/* <Card.Title>{product.title}</Card.Title> */}
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
    );
};

export default Home;