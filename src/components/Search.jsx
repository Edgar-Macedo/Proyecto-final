import { useDispatch } from 'react-redux/es/exports';
import {filterProductThunk} from '../store/slices/Products.slice'

import React from 'react';
import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Search = () => {

    const dispatch = useDispatch()

    const [searchValue, setSearchValue] = useState("")

    return (
        <div>
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
        </div>
    );
};

export default Search;