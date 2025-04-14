import React, { useEffect, useState } from "react";
import { getOrdersByUser } from "../../api";
import Accordion from "react-bootstrap/Accordion";
import Order from "../order";

const OrderList = () => {
    const [orders, setOrders] = useState();

    useEffect(() => {
        async function getOrdersData() {
            const response = await getOrdersByUser();
            setOrders(response.orders);
        }
        getOrdersData();
    }, []);

    return (
        <Accordion alwaysOpen flush className="border shadow">
            {orders && orders.map((order) => 
                <Accordion.Item eventKey={order.id} key={order.id}>
                    <Accordion.Header>OrderID: {order.id} Order time: {new Date(order.order_time).toDateString()}</Accordion.Header>
                    <Accordion.Body>
                        <Order order={order} />
                    </Accordion.Body>
                </Accordion.Item>
            )}
        </Accordion>
    )
}

export default OrderList;