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
export const createAccount = payload => api.post(`/accounts/create`, payload, config())
export const updateAccount = (id, payload) => api.put(`/account/${id}`, payload, config())
export const deleteAccount = id => api.delete(`/account/${id}`, config())

//Associates
export const getAvailableUsers = () => api.get('/getAvailableUsers', config())
export const getAccountAssociates = payload => api.post(`/getAccountAssociates`, payload, config())
export const createAssociate = payload => api.post(`/associates/create`, payload, config())
export const deleteAssociate = id => api.delete(`/associate/${id}`, config())

//Transfers
export const getAllTransfers = () => api.get('/getAllTransfers', config())

const apis = {
    //Users
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    //Accounts
    getAllAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
    //Associates
    getAvailableUsers,
    getAccountAssociates,
    createAssociate,
    deleteAssociate,
    //Transfers
    getAllTransfers
}

export default apis