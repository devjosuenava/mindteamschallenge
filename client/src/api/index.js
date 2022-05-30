import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
})


export const config = () => {
    return {
        headers: {
            'x-access-token': JSON.parse(window.localStorage.getItem('token')).token
        }
    }
}

// Users
export const getAllUsers = () => api.get('/getAllUsers', config())
export const createUser = payload => api.post(`/users/create`, payload, config())
export const updateUser = (id, payload) => api.put(`/user/${id}`, payload, config())
export const deleteUser = id => api.delete(`/user/${id}`, config())

//Accounts
export const getAllAccounts = () => api.get('/getAllAccounts', config())

const apis = {
    //Users
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    //Accounts
    getAllAccounts
}

export default apis