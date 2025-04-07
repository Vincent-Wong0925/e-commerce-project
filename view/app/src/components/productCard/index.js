import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import watchImg from "../../img/watch.jpg";

const ProductCard = ({
    productImg,
    productName,
    productPrice
}) => {
    return (
        <Card>
            <Card.Img src={productImg || watchImg} />
            <Card.Body>
                <Card.Title>{productName}</Card.Title>
                <Card.Text>{productPrice}</Card.Text>
                <Button>Detail</Button>
            </Card.Body>
        </Card>
    )
}

export default ProductCard;