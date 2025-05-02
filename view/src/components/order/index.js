import React, { useEffect, useState } from "react";
import { getOrderById } from "../../api";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Order = ({ order }) => {
    const [items, setItems] = useState();

    useEffect(() => {
        async function getOrderItem() {
            const response = await getOrderById(order.id);
            setItems(response.order);
        }
        getOrderItem();
    }, []);

    return (
        <Container>
            <Row className="justify-content-between border-bottom">
                <p>Order ID: {order.id}</p>
                <p>Order date: {new Date(order.order_time).toDateString()}</p>
                <p>Total: HK${items ? items.reduce((accumulator, item) => {return accumulator + item.price * item.number}, 0) : ''}</p>
            </Row>
            {items && items.map((item) => 
                <Row className="py-3 border-bottom">
                    <Col>
                        <img src={item.image} 
                            alt="product" 
                            className="object.fit.cover"
                            style={{"width": "5rem", "height": "5rem"}} />
                    </Col>

                    <Col>
                        <p>{item.name}</p>
                        <p>{item.note}</p>
                    </Col>

                    <Col><p>{item.number}</p></Col>

                    <Col><p>HK${item.price}</p></Col>
                </Row>
            )}
        </Container>
    )
}

export default Order;