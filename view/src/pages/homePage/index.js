import React, { useEffect, useState } from "react";
import Banner from "../../components/banner";
import ProductList from "../../components/productList";
import Container from "react-bootstrap/esm/Container";
import { getProducts } from "../../api";

const HomePage = () => {
    const [products, setPorducts] = useState([]);

    useEffect(() => {
        async function getProductsData() {
            const data = await getProducts('', 4);
            
            setPorducts(data.products);
        }

        getProductsData();
    }, []);

    return(
        <Container className="HomePage">
            <Banner />
            <ProductList products={products} />
        </Container>
    );
}

export default HomePage;