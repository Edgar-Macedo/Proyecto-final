import React from 'react';
import {Navbar, Nav, Container, Button, Offcanvas } from 'react-bootstrap';
import { Search, Sidebar } from './index';
import { getProductsThunk } from '../store/slices/Products.slice';
import { useDispatch } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

const NavBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')


  const logout = () => {
    localStorage.setItem("token", "")
    navigate(`/login`)
  }

 
    return (
      <>
        <Navbar bg="dark" variant="dark" expand="lg" >
        <Container>
          <Navbar.Brand href="#/" onClick={()=>dispatch(getProductsThunk())} >Ecomerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <div className="login">
                {token ? 
                  <div style={{marginTop:"-.10rem"}}>
                    <Nav.Link as={Button} onClick={logout}>Logout</Nav.Link>
                  </div>
                : 
                  <Nav.Link href="#/login">Login</Nav.Link>}
              </div>       
              <Nav.Link href="#/purchases">Purchases</Nav.Link>              
              <Search/> 
              <Nav.Link> <Sidebar/></Nav.Link>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
      </>
    );
};

export default NavBar;