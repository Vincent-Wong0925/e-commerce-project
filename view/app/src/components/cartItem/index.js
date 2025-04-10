import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

const CartItem = ({ item }) => {
    const {product_id, name, price, number, note, image} = item;

    return (
        <Card key={product_id} 
            className="d-flex justify-content-between align-self-center mx-auto mb-3 shadow" 
            style={{"min-height": "6rem", "max-width": "50rem", "min-width": "25rem"}}>
            <Row className="h-100 d-flex align-items-center justify-content-center">
                <Col className="h-100" xs={4} md={2}>
                    <Card.Img src={image} 
                        alt="cart item image" 
                        className="object-fit-cover p-md-3 p-1 mx-2" 
                        style={{"height": "8rem", "width": "8rem"}} />
                </Col>
                <Col xs={6} md={8} className="p-0">
                    <Card.Body className="h-100">
                        <Row className="align-items-center" xs={1} md={5}>
                            <Col xs md={6} className="mb-2">
                                <Card.Text className="fs-4 mb-0">{name}</Card.Text>
                                <Card.Text>{note}</Card.Text>
                            </Col>
                            <Col xs md={2}>
                                <Card.Text className="fs-md-5">{number}</Card.Text>
                            </Col>
                            <Col xs md={4}>
                                <Card.Text className="fs-md-5">HK${price}</Card.Text>
                            </Col>
                        </Row>
                    </Card.Body>
                </Col>
                <Col xs={2} md={2} className="p-0">
                    <Button variant="outline-secondary" className="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                    </Button>
                </Col>
            </Row>
        </Card>
    )
}

export default CartItem;