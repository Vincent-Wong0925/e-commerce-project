import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import watchImg from "../../img/watch.jpg";

const Banner = () => {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={10}>
                    <Carousel>
                        <Carousel.Item>
                            <Card className="text-white" style={{height: "25rem"}}>
                                <Card.Img src={watchImg} alt="card image" style={{width: "100%", height:"100%",objectFit: "cover", objectPosition: "100% 80%"}} />
                                <Card.ImgOverlay className="d-flex">
                                    <Card.Title className="align-self-center mx-auto">Welcome to Watch Shop</Card.Title>
                                </Card.ImgOverlay>
                            </Card>
                        </Carousel.Item>
                        <Carousel.Item></Carousel.Item>
                        <Carousel.Item></Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
        </Container>
    )
}

export default Banner;