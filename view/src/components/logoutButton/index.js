import React from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <Button variant="danger" onClick={handleLogout} className="my-3">Log out</Button>
    )
}

export default LogoutButton;