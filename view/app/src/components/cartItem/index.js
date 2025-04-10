import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

const CartItem = ({ item }) => {
    const {product_id, name, price, number, note, image} = item;

    return (
        <Card key={product_id} 
            className="d-flex justify-content-between align-self-center mx-auto mb-3" 
            style={{"height": "8rem", "max-width": "50rem"}}>
            <Row className="h-100">
                <Col className="h-100" xs={4} md={2}>
                    <Card.Img src={image} alt="cart item image" className="object-fit-cover h-100 w-100 p-md-3 p-1" />
                </Col>
                <Col>
                    <Card.Body className="h-100">
                        <Row className="align-items-center">
                            <Col xs lg={6}>
                                <Card.Text className="fs-3">{name}</Card.Text>
                                <Card.Text>{note}</Card.Text>
                            </Col>
                            <Col xs={2} lg={2} className="d-flex justify-content-between">
                                <Card.Text className="fs-md-5">{number}</Card.Text>
                                <Card.Text className="fs-md-5">{price}</Card.Text>
                            </Col>
                            <Col xs={4} md={2}>
                                <Button variant="secondary" className="w-100">X</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    )
}

export default CartItem;