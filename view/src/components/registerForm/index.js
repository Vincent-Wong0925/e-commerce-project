import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { registerUser } from "../../api";

const RegisterForm = ({ toggle }) => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    async function handleRegister() {
        try {
            const response = await registerUser(name, email, password);
            if (response.error) {
                console.log(response.error);
            }
            alert("Account successfully created");
            toggle();
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <Container className="shadow p-3 my-3">
            <h1 className="my-3">Register an account</h1>
            <Form action={handleRegister}>
                <Form.Group className="mb-3" controlId="registerName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter username" 
                        required 
                        value={name} 
                        onChange={(e) => {setName(e.target.value)}} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="registerEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        required 
                        value={email} 
                        onChange={(e) => {setEmail(e.target.value)}} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="registerPassword">
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
            <Button className="mb-3" variant="secondary" type="button" onClick={toggle}>Login to existing account</Button>
        </Container>
    )
}

export default RegisterForm;