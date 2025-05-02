import React, { useState } from "react";
import LoginForm from "../../components/loginForm";
import RegisterForm from "../../components/registerForm";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const LoginPage = () => {
    const [loginState, setLoginState] = useState(true);

    function toggleLogin() {
        setLoginState(!loginState);
    }

    return (
        <Container className="LoginPage">
            <Row className="justify-content-center">
                <Col xs lg="6">
                    {loginState ? <LoginForm toggle={toggleLogin} /> : <RegisterForm toggle={toggleLogin} />}
                </Col>
            </Row>
        </Container>
    )
}

export default LoginPage;