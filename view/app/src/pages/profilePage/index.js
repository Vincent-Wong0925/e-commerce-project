import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../../components/logoutButton";
import { getProfile } from "../../api";

const ProfilePage = () => {
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        async function getProfileData() {
            const response = await getProfile();
            if (response.error) {
                return navigate('/login');
            }
            setUser(response)
        }
        getProfileData();
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