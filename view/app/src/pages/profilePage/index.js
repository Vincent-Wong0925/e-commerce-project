import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../../components/logoutButton";

const ProfilePage = () => {
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        async function getProfile() {
            try {
                const response = await fetch('http://localhost:3000/profile', {
                    method: "GET",
                    credentials: "include"
                });
                const json = await response.json();
                if (json.error) {
                    return navigate('/login');
                }
                setUser(json);
            } catch(err) {
                alert(err);
            }
        }
        getProfile();
    },[]);

    return (
        <Container className="vh-100">
            {user && 
                <div>
                    <h1>{user.username}</h1>
                    <h3>{user.email}</h3>
                    <LogoutButton />
                </div>}
        </Container>
    )
}

export default ProfilePage;