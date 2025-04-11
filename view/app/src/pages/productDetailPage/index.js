import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import { useLocation, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { addToCart, getProfile } from "../../api";

const ProductDetailPage = () => {
    const [quantity, setQuantity] = useState(1);
    const [showToast, setShowToast] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state;

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    }

    const handleAddToCart = async () => {
        const profile = await getProfile();
        if (profile.error) {
            return navigate('/login');
        }
        const response = await addToCart(product.id, quantity);
        if (response.error) {
            return console.log(response.error);
        }
        console.log(response);
        setShowToast(true);
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
                            <Card.Title className="fs-2">{product.name}</Card.Title>
                            <Card.Text>{product.note}</Card.Text>
                            <Card.Text className="fs-3">{product.price}</Card.Text>
                            <Card.Text>
                                <label for="quantity" className="d-block my-2">Quantity:</label>
                                <input type="number" 
                                    min="1" 
                                    id="quantity" 
                                    name="quantity" 
                                    value={quantity}
                                    onChange={handleQuantityChange} />
                            </Card.Text>
                            <Button className="w-100" onClick={handleAddToCart}>Add to cart</Button>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>

            <ToastContainer position="middle-center">
                <Toast onClose={() => setShowToast(false)} 
                    show={showToast} 
                    delay={3000}
                    autohide>
                    <Toast.Body>Item added to shopping cart</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    )
}

export default ProductDetailPage;