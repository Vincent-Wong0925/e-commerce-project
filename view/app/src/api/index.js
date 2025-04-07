const baseURL = 'http://localhost:3000'

export const getProducts = async (type, number) => {
    const queryParams = new URLSearchParams({type, number});
    
    const response = await fetch(`${baseURL}/products?${queryParams.toString()}`, {
        method: 'GET'
    });
    
    const json = await response.json();
    
    return json;
}