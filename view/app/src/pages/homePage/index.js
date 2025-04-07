import React from "react";
import Banner from "../../components/banner";
import ProductList from "../../components/productList";
import watchImg from "../../img/watch.jpg";

const HomePage = () => {
    return(
        <div className="HomePage">
            <Banner />
            <ProductList products={[
                {image: watchImg, name: "jkhkjnj", price: 3600.00},
                {image: watchImg, name: "jkhkjnj", price: 3600.00},
                {image: watchImg, name: "jkhkjnj", price: 3600.00},
                {image: watchImg, name: "jkhkjnj", price: 3600.00}
            ]} />
        </div>
    );
}

export default HomePage;