const baseURL = 'http://localhost:3000'

export const getProducts = async () => {
    const response = await fetch(baseURL + '/products', {
        method: 'GET'
    });
    
    const json = await response.json();
    
    return json;
}

export const getProductsByType = async (type) => {
    const response = await fetch(`${baseURL}/products?type=${type}`, {
        method: 'GET'
    });
    
    const json = await response.json();
    
    return json;
}