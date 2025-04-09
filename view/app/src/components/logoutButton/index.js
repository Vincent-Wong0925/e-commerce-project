import React from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            const response = await fetch('http://localhost:3000/logout', {
                method: "POST",
                credentials: "include"
            });
            navigate('/login');
        } catch(err) {
            alert("Something went wrong");
        }
    }

    return (
        <Button variant="danger" onClick={handleLogout}>Log out</Button>
    )
}

export default LogoutButton;