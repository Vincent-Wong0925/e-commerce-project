import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import { useLocation } from "react-router-dom";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";

const ProductDetailPage = () => {
    const [quantity, setQuantity] = useState(1);

    const location = useLocation();
    const product = location.state;

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    }

    return (
        <Container className="vh-100 d-flex align-items-center">
            <Card className="align-self-center m-auto h-75 w-75 border-0">
                <Row className="h-100">
                    <Col className="h-100 border p-0">
                        <Card.Img src={product.image} 
                            alt="product image" 
                            className="h-100 object-fit-cover"/>
                    </Col>
                    <Col>
                        <Card.Body className="h-100">
                            <Card.Title><h2>{product.name}</h2></Card.Title>
                            <Card.Text>{product.note}</Card.Text>
                            <Card.Text><h3>{product.price}</h3></Card.Text>
                            <Card.Text>
                                <label for="quantity" className="d-block my-2">Quantity:</label>
                                <input type="number" 
                                    min="1" 
                                    id="quantity" 
                                    name="quantity" 
                                    value={quantity}
                                    onChange={handleQuantityChange} />
                            </Card.Text>
                            <Button className="w-100">Add to cart</Button>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}

export default ProductDetailPage;