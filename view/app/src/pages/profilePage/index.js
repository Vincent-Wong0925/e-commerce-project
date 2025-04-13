import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../../components/logoutButton";
import { getProfile } from "../../api";
import OrderList from "../../components/orderList";

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
        <Container className="vh-100 py-3">
            {user && 
                <div>
                    <h1>Profile</h1>
                    <h2>{user.username}</h2>
                    <h3>Email: {user.email}</h3>
                    <OrderList />
                    <LogoutButton />
                </div>}
        </Container>
    )
}

export default ProfilePage;