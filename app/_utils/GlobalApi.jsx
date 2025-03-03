const { default: axios } = require("axios")

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL 
    // "http://localhost:1337/api",
})

const getCategory = () => axiosClient.get('/categories?populate=*')
const getCategoryList = () => axiosClient.get('/categories?populate=*').then(resp => { 
    return (resp.data.data.sort((a, b) => a.name.localeCompare(b.name)))
})

const getSliders = () => axiosClient.get('/sliders?populate=*').then(resp => {return(resp.data.data)})

const getAllProducts = () => axiosClient.get('/products?populate=*').then(resp => {return(resp.data.data)})
const getProductsByCategory = (category) => axiosClient.get(`/products?pagination[pageSize]=100&filters[category][name][$in]=${category}&populate=*`).then(resp => {
    return(resp.data.data.sort((a, b) => a.name.localeCompare(b.name)))
})

const registerUser = (username, email, password) => axiosClient.post('/auth/local/register', {
    username: username,
    email: email,
    password: password
})

const signInUser = (email, password) => axiosClient.post('/auth/local', {
    identifier: email,
    password: password
})

const addToCart = (data, jwt) => axiosClient.post('/user-carts', data, {
    headers: {
        Authorization: 'Bearer '+jwt
    }
})

const getCartItems = (userId, jwt) => axiosClient.get(`/user-carts?filters[userId][$eq]=${userId}&populate[products][populate][0]=image`, {
    headers: {
        Authorization: 'Bearer '+jwt
    }
}).then(resp => {
    const data = resp.data.data
    console.log('data: ', data)
    const cartItemsList = data.map((item, index) => ({
        name: item.products[0]?.name,
        quantity: item.Quantity,
        amount: item.Amount,
        image: item.products[0]?.image?.url,
        actualPrice: item.products[0]?.mrp,
        id: item.documentId,
        product: item.products[0]?.documentId
    }))

    return cartItemsList
})

const deleteCartItem = (id, jwt) => axiosClient.delete(`/user-carts/${id}`, {
    headers: {
        Authorization: 'Bearer '+jwt
    }
})

const createOrder = (data, jwt) => axiosClient.post('/orders', data, {
    headers: {
        Authorization: 'Bearer '+jwt
    }
})

const getOrderId = (id, jwt) => axiosClient.get(`/orders?filters[userId][$eq]=${id}`, {
    headers: {
        Authorization: 'Bearer '+jwt
    }
})

const updateOrder = (id, data, jwt) => axiosClient.put(`/orders/${id}`, data, {
    headers: {
        Authorization: 'Bearer '+jwt
    }
})

const getCartId = (id, jwt) => axiosClient.get(`/user-carts?filters[userId][$eq]=${id}`, {
    headers: {
        Authorization: 'Bearer '+jwt
    }
})

const deleteShoppingCart = (id, jwt) => axiosClient.delete(`/user-carts/${id}`, {
    headers: {
        Authorization: 'Bearer '+jwt
    }
})

export default {
    getCategory,
    getCategoryList,
    getSliders,
    getAllProducts,
    getProductsByCategory,
    registerUser,
    signInUser,
    addToCart,
    getCartItems,
    deleteCartItem,
    createOrder,
    getOrderId,
    updateOrder,
    getCartId,
    deleteShoppingCart,
}