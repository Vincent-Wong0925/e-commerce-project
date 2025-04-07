import React, { useEffect, useState } from "react";
import { getProducts } from "../../api";
import ProductList from "../../components/productList";
import Container from "react-bootstrap/esm/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const ProductsPage = () => {
    const [products, setPorducts] = useState([]);
    const [productType, setProductType] = useState('');

    useEffect(() => {
        async function getProductsData() {
            const data = await getProducts(productType, '');
            setPorducts(data.products);
        }

        getProductsData();
    }, [productType]);

    return (
        <Container className="ProductsPage my-3">
            <Row>
                <Col>
                    <h1>Products</h1>
                    <h2>Filter</h2>
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary">
                            Filter
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Button} onClick={() => {setProductType('')}}>All products</Dropdown.Item>
                            <Dropdown.Item as={Button} onClick={() => {setProductType('watches')}}>Watches</Dropdown.Item>
                            <Dropdown.Item as={Button} onClick={() => {setProductType('straps')}}>Straps</Dropdown.Item>
                            <Dropdown.Item as={Button} onClick={() => {setProductType('accessories')}}>Accessories</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <ProductList products={products} />
                </Col>
            </Row>
        </Container>
    )
}

export default ProductsPage;