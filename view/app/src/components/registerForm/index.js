import React from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";

const RegisterForm = ({ toggle }) => {
    return (
        <Container className="shadow p-3 my-3">
            <h1 className="my-3">Register an account</h1>
            <Form>
                <Form.Group className="mb-3" controlId="registerName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="registerEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="registerPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" required />
                </Form.Group>
                <Button className="mb-3" variant="primary" type="submit">Submit</Button>
            </Form>
            <Button className="mb-3" variant="secondary" type="button" onClick={toggle}>Login to existing account</Button>
        </Container>
    )
}

export default RegisterForm;