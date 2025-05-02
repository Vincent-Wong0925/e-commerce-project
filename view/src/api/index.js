const baseURL = 'https://e-commerce-project-j5tp.onrender.com'

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

export const deleteCartItem = async (product_id) => {
    try {
        const query = product_id ? `?product_id=${product_id}` : ``;
        const response = await fetch(`${baseURL}/carts${query}`, {
            method: 'DELETE',
            credentials: "include"
        });
        
        const json = await response.json();
        
        return json;
    } catch(err) {
        console.log(err);
    }
}

export const addToCart = async (product_id, quantity) => {
    try {
        const response = await fetch(`${baseURL}/carts`, {
            headers: {
                "Content-type": "application/json"
            },
            method: "post",
            credentials: "include",
            body: JSON.stringify({
                product_id,
                number: quantity
            })
        });

        const json = await response.json();

        return json;
    } catch(err) {
        console.log(err);
    }
}

export const registerUser = async (name, email, password) => {
    try {
        const response = await fetch(`${baseURL}/register`, {
            headers:{
                'Content-type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({ username: name, email, password }),
            credentials: "include"
        })

        const json = await response.json();
        
        return json;
    } catch(err) {
        console.log(err);
    }
}

export const checkoutCart = async () => {
    try {
        const response = await fetch(`${baseURL}/carts/checkout`, {
            method: "POST",
            credentials: "include"
        });

        const json = await response.json();

        return json;
    } catch(err) {
        console.log(err);
    }
}

export const getOrdersByUser = async () => {
    try {
        const response = await fetch(`${baseURL}/orders`, {
            method: "GET",
            credentials: "include"
        });

        const json = await response.json();

        return json;
    } catch(err) {
        console.log(err);
    }
}

export const getOrderById = async (orderId) => {
    try {
        const response = await fetch(`${baseURL}/orders/${orderId}`, {
            method: "GET",
            credentials: "include"
        });

        const json = await response.json();

        return json;
    } catch(err) {
        console.log(err);
    }
}

export const logout = async () => {
    try {
        const response = await fetch(`${baseURL}/logout`, {
            method: "POST",
            credentials: "include"
        });
    } catch(err) {
        alert("Something went wrong");
    }
}