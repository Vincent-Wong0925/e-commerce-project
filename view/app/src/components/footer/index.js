import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <Container className="bg-dark text-white py-4 mt-4" fluid>
                <Row>
                    <Col>
                        <h1>Brand Name</h1>
                        <h2>Slogan</h2>
                    </Col>
                    <Col>
                        <h1>Useful Links</h1>
                        <Link className="text-reset text-decoration-none d-block" to='/'>Home</Link>
                        <Link className="text-reset text-decoration-none d-block" to='/products'>Products</Link>
                        <Link className="text-reset text-decoration-none d-block" to='/about'>About</Link>
                    </Col>
                    <Col>
                        <h1>Contact Us</h1>
                        <p>Email: watchshop@gmail.com</p>
                        <p>Tel: 1234 5678</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;