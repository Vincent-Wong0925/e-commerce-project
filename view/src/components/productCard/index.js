import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const ProductCard = ({product}) => {
    const {name, image, price} = product;
    const navigate = useNavigate();

    const handleDetail = () => {
        navigate('/products/detail', {
            state: product
        })
    }

    return (
        <Card style={{height: "24rem"}}>
            <Card.Img src={image || 'https://d2i8wfwwd0u9rg.cloudfront.net/watch.jpg'} 
                className="h-50 w-100 object-fit-cover" />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{price}</Card.Text>
                <Button onClick={handleDetail}>Detail</Button>
            </Card.Body>
        </Card>
    )
}

export default ProductCard;