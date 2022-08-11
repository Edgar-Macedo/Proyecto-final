import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Offcanvas, Button, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { getCartThunk } from '../store/slices/cart.slice';

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

    return (
        <div style={{ marginTop: "-.69rem" }}>

            <Button variant="primary" size="sm" onClick={handleShow}>
                <i className="fa-solid fa-cart-shopping"></i>
            </Button>

            <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>My cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup variant='flush'>
                        {
                            cartItems.cart.products.map(item => (
                                <ListGroup.Item> <p style={{fontSize:".75rem"}}>{item.title}</p> </ListGroup.Item>
                            ))
                        }
            
                    </ListGroup>


                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default Sidebar;