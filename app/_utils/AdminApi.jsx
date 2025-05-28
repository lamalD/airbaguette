const { default: axios } = require("axios")

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL+'api' 
    // "http://localhost:1337/api",
})

const getUsers = () => axiosClient.get('/users')
const getLastUser = () => axiosClient.get('/users').then(resp => {
    return resp.data[resp.data.length - 1];
})
const getUsersCount = () => axiosClient.get('/users/count')

const getCurrentOrders = () => axiosClient.get('/orders?pagination[pageSize]=1000&populate[0]=orderItemList&populate[1]=orderItemList.product')
    .then(resp => {return(resp.data.data.sort((a, b) => b.createdAt.localeCompare(a.createdAt)))})

const getAllOrders = () => axiosClient.get('/orders?pagination[pageSize]=1000&populate[0]=orderItemList&populate[1]=orderItemList.product&status=draft')
    .then(resp => {return(resp.data.data.sort((a, b) => a.createdAt.localeCompare(b.createdAt)))})

const completeOrder = (id, data, jwt) => axiosClient.put(`/orders/${id}`, data, {
    headers: {
        Authorization: 'Bearer '+jwt
    }
})

const openOrder = (id, data, jwt) => axiosClient.put(`/orders/${id}`, data, {
    headers: {
        Authorization: 'Bearer '+jwt
    }
})

export default {
    getUsers,
    getLastUser,
    getUsersCount,
    getCurrentOrders,
    getAllOrders,
    completeOrder,
    openOrder,
}