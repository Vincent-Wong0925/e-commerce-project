import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import CartItem from "../../components/cartItem";

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getCart() {
            try {
                const response = await fetch('http://localhost:3000/carts', {
                    method: "GET",
                    credentials: "include"
                });
                const json = await response.json();
                setCart(json.cart);
            } catch(err) {
                alert("Something went wrong");
            }
        }
        getCart();
    },[]);

    return (
        <Container className="m-vh-100">
            <h1 className="my-3">Shopping Cart</h1>
            {!cart ? 
                navigate('/login') : 
                cart.map((item) => <CartItem item={item} />)
            }
        </Container>
    )
}

export default CartPage;