const baseURL = 'http://localhost:3000'

export const getProducts = async (type, number) => {
    const queryParams = new URLSearchParams({type, number});
    
    const response = await fetch(`${baseURL}/products?${queryParams.toString()}`, {
        method: 'GET'
    });
    
    const json = await response.json();
    
    return json;
}

export const getCart = async () => {
    try {
        const response = await fetch(`${baseURL}/carts`, {
            method: "GET",
            credentials: "include"
        });
        const json = await response.json();
        return json;
    } catch(err) {
        alert("Something went wrong");
    }
}

export const loginUser = async (email, password) => {
    const response = await fetch(`${baseURL}/login`, {
        headers:{ 'Content-type': 'application/json', },
        method: "POST",
        body: JSON.stringify({ email, password }),
        credentials: "include"
    });

    const json = response.json();
    return json;
}

export const getProfile = async () => {
    try {
        const response = await fetch(`${baseURL}/profile`, {
            method: "GET",
            credentials: "include"
        });
        const json = await response.json();
        return json;
    } catch(err) {
        alert(err);
    }
}