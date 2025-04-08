import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ toggle }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const baseURL = 'http://localhost:3000'
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await fetch(`${baseURL}/login`, {
                headers:{ 'Content-type': 'application/json', },
                method: "POST",
                body: JSON.stringify({ email, password }),
                credentials: "include"
            });
            navigate('/');
        } catch(err) {
            alert(err);
        }
    }

    return (
        <Container className="shadow p-3 my-3">
            <h1 className="my-3">Login</h1>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="loginEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        required 
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter password" 
                        required 
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}} />
                </Form.Group>
                <Button className="mb-3" variant="primary" type="submit">Submit</Button>
            </Form>
            <Button className="mb-3" variant="secondary" type="button" onClick={toggle}>Register a new account</Button>
        </Container>
    )
}

export default LoginForm;