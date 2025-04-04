import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const ProductCard = ({
    productImg,
    productName,
    productPrice
}) => {
    return (
        <Card>
            <Card.Img src={productImg} />
            <Card.Body>
                <Card.Title>{productName}</Card.Title>
                <Card.Text>${productPrice}</Card.Text>
                <Button>Add to cart</Button>
            </Card.Body>
        </Card>
    )
}

export default ProductCard;