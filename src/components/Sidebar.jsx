import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Offcanvas, Button, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { checkoutThunk, getCartThunk } from '../store/slices/cart.slice';
import { removeFromCartThunk } from '../store/slices/cart.slice';


const Sidebar = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        if (token) {
            setShow(true)
        } else {
            navigate("/login")
        }
    }

    useEffect(() => {
        dispatch(getCartThunk())

    }, [])

    const removeItem = (id) => {
        dispatch(removeFromCartThunk(id))
    }

    return (
        <div style={{ marginTop: "-.69rem" }}>

            <Button variant="primary" size="sm" onClick={handleShow}>
                <i className="fa-solid fa-cart-shopping"></i>
            </Button>

            <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>My cart <i className="fa-solid fa-cart-shopping"></i></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup variant='flush'>
                        {
                            cartItems.cart?.products.map(item => (
                                <ListGroup.Item key={item.id}>
                                    <div onClick={() => navigate(`/product/${item.id}`)} style={{fontSize:".75rem", cursor:"pointer"}}>
                                       {item.title}
                                    </div>
                                    <button onClick={() => removeItem(item.id)}><i className="fa-solid fa-trash-can"></i></button>
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                    <Button onClick={() => dispatch(checkoutThunk())}>Checkout</Button>

                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default Sidebar;