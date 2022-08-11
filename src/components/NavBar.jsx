import React from 'react';
import {Navbar, Nav, Container } from 'react-bootstrap';
import { Search } from './index';
import { getProductsThunk } from '../store/slices/Products.slice';
import { useDispatch } from 'react-redux/es/exports';

const NavBar = () => {

  const dispatch = useDispatch()

    return (
        <Navbar bg="dark" variant="dark" expand="lg" >
        <Container>
          <Navbar.Brand href="#/" onClick={()=>dispatch(getProductsThunk())} >Ecomerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#/login">Login</Nav.Link>  {/* MAKE THIS A CONDITIONAL  */}
              <Nav.Link href="#/purchases">Purchases</Nav.Link>              
              <Search/> 
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
};

export default NavBar;