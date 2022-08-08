import React from 'react';
import '../styles/loading.css'
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
    return (
        <div className='overlay'>
           <Spinner animation="grow"  variant="light"/>
           
           <Spinner animation="grow"  variant="light"/>
           <Spinner animation="grow"  variant="light"/>
        </div>
    );
};

export default Loading;