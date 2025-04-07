import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const ProductCard = ({
    productImg,
    productName,
    productPrice
}) => {
    return (
        <Card style={{height: "24rem"}}>
            <Card.Img src={productImg || 'https://d2i8wfwwd0u9rg.cloudfront.net/watch.jpg'} 
                className="h-50 w-100 object-fit-cover" />
            <Card.Body>
                <Card.Title>{productName}</Card.Title>
                <Card.Text>{productPrice}</Card.Text>
                <Button>Detail</Button>
            </Card.Body>
        </Card>
    )
}

export default ProductCard;