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

const getAllOrders = () => axiosClient.get('/orders?pagination[pageSize]=100&populate=*')
    .then(resp => {return(resp.data.data.sort((a, b) => a.createdAt.localeCompare(b.createdAt)))})

export default {
    getUsers,
    getLastUser,
    getUsersCount,
    getAllOrders,
}