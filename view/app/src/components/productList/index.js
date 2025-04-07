import React from "react";
import ProductCard from "../productCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";

const ProductList = ({products=[]}) => {
    return (
        <Container className="ProductList m-3">
            <Row xs={1} md={4} className="g-4">
                {products.map((product) => 
                    <Col>
                        <ProductCard productImg={product.image} 
                            productName={product.name} 
                            productPrice={product.price} />
                    </Col>)}
            </Row>
        </Container>
    )
}

export default ProductList;