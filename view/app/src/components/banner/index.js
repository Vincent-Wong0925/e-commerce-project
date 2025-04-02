import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import watchImg from "../../img/watch.jpg";
import wristImg from "../../img/wrist.jpg";
import strapImg from "../../img/strap.jpg";

const Banner = () => {
    return (
        <Container className="my-3">
            <Row className="justify-content-center">
                <Col xs={10}>
                    <Carousel controls={false}>
                        <Carousel.Item>
                            <Card className="text-white bg-black d-flex" style={{height: "25rem"}}>
                                <Card.Img src={watchImg} 
                                    className="opacity-50" 
                                    alt="card image" 
                                    style={{
                                        width: "100%", 
                                        height:"100%",
                                        objectFit: "cover", 
                                        objectPosition: "100% 80%"}} />
                                <Card.ImgOverlay className="text-center align-self-center mx-auto">
                                    <Card.Title>Welcome to Watch Shop</Card.Title>
                                    <Card.Text>A one-stop destination for all your desired wrist watches and accessories</Card.Text>
                                    <Button variant="secondary" className="rounded-pill">Login</Button>
                                </Card.ImgOverlay>
                            </Card>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Card className="text-white bg-black d-flex" style={{height: "25rem"}}>
                                <Row className="h-100">
                                    <Col xs={6} className="text-center align-self-center mx-auto">
                                        <Card.Body>
                                            <Card.Title>Find your dream watch today</Card.Title>
                                            <Button variant="secondary" className="rounded-pill">Shop Now</Button>
                                        </Card.Body>
                                    </Col>
                                    <Col xs={6} className="h-100">
                                        <Card.Img src={wristImg} 
                                            alt="wrist image" 
                                            className="object-fit-cover h-100" />
                                    </Col>
                                </Row>
                            </Card>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Card className="text-white bg-black d-flex" style={{height: "25rem"}}>
                                <Row className="h-100">
                                    <Col className="text-center align-self-center mx-auto">
                                        <Card.Body>
                                            <Card.Title>Great variety of high quality accessories for your precious watches</Card.Title>
                                            <Button variant="secondary rounded-pill">Shop Now</Button>
                                        </Card.Body>
                                    </Col>
                                    <Col className="h-100">
                                        <Card.Img src={strapImg} 
                                            alt="strap image" 
                                            className="object-fit-cover h-100" />
                                    </Col>
                                </Row>
                            </Card>
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
        </Container>
    )
}

export default Banner;