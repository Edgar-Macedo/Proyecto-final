import axios from 'axios';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const { register, handleSubmit, reset } = useForm()
    const navigate = useNavigate()

    
    const submit = data => {
        

        axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', data)
            .then(res => {
                    navigate("/")
                    localStorage.setItem('token', res.data.data.token)
                })
            .catch(error => {
                if(error.status === 401 || error.status === 404){
                    alert("Invalid email or password")
                }
                
                alert("Please enter your credentials")
            })
        reset({
            email:"",
            password:""
        })
    }

    return (
        <div className='login-container'>
            <div className="login">

                <Form onSubmit={handleSubmit(submit)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="max@gmail.com"{... register("email")} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="pass1234"{... register("password")} />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Login;