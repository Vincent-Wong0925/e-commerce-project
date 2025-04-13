import React, { useEffect, useState } from "react";
import { getOrdersByUser } from "../../api";

const OrderList = () => {
    const [orders, setOrders] = useState();

    useEffect(() => {
        async function getOrdersData() {
            const response = await getOrdersByUser();
            setOrders('hi');
            console.log(orders);
        }
        getOrdersData();
    }, []);

    return (
        <div>hkjjjjhj</div>
    )
}

export default OrderList;