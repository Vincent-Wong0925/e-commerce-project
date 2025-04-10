import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import CartItem from "../../components/cartItem";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { getCart } from "../../api";

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    async function getCartData() {
        const response = await getCart();
        setCart(response.cart);
    }

    useEffect(() => {
        getCartData();
    },[]);

    return (
        <Container className="m-vh-100">
            <h1 className="my-3">Shopping Cart</h1>
            {!cart ? 
                navigate('/login') : 
                cart.map((item) => <CartItem item={item} />)
            }
            {cart && 
                <Card style={{"max-width": "50rem", "min-width": "25rem"}}
                    className="align-self-center mx-auto shadow justify-content-center">
                    <Card.Body>
                        <Row className="d-flex justify-content-between p-2">
                            <Col className="d-flex align-items-center">
                                <Card.Title>Total: HK$
                                    {cart.reduce((accumulator, item) => {
                                        return accumulator + item.price * item.number;
                                    }, 0)}
                                </Card.Title>
                            </Col>
                            <Col className="d-flex justify-content-end">
                                <Button>Checkout</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            }
        </Container>
    )
}

export default CartPage;