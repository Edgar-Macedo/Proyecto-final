import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';

const Purchases = () => {

    let cartTotal = 0

    const dispatch = useDispatch()
    const purchases = useSelector(state => state.purchases)

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])


    return (
        <div>
            <h1>Purchases</h1>

            
            {
                purchases?.map(purchased => (

                    <div className="cart-container">
                        {purchased.cart.products.length != 0 &&
                            <div className="cart" style={{marginBottom:"3rem"}} key={purchased.id}>
                                <Table striped bordered >
        
                                    <thead>
                                        <tr style={{background:"rgb(36, 36, 36)", color:"white"}}>
                                            <th>#{purchased.id + 1}</th>
                                            <th>Item</th>
                                            <th>Quantity</th>
                                            <th>Price per unit</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            purchased.cart.products?.map(product => (
                                                <tr key={product.id}>
                                                    <td></td>
                                                    <td>{product.title}</td>
                                                    <td>{product.productsInCart?.quantity}</td>
                                                    <td>${product.price}</td>
                                                    <td>${((Number(product.price) * product.productsInCart?.quantity))}.00</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </div>
           
                        }
                    </div>
                ))
            }

        </div>
    );
};

export default Purchases;