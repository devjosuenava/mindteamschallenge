import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
})


export const config = () => {
    return {
        headers: {
            'x-access-token': JSON.parse(window.localStorage.getItem('auth')).token
        }
    }
}

// Users
export const getAllUsers = async () => api.get('/getAllUsers', config())
export const createUser = async payload => api.post(`/users/create`, payload, config())
export const updateUser = async (id, payload) => api.put(`/user/${id}`, payload, config())
export const deleteUser = async id => api.delete(`/user/${id}`, config())

//Accounts
export const getAllAccounts = async () => api.get('/getAllAccounts', config())
export const createAccount = async payload => api.post(`/accounts/create`, payload, config())
export const updateAccount = async (id, payload) => api.put(`/account/${id}`, payload, config())
export const deleteAccount = async id => api.delete(`/account/${id}`, config())

//Associates
export const getAvailableUsers = async () => api.get('/getAvailableUsers', config())
export const getAccountAssociates = async payload => api.post(`/getAccountAssociates`, payload, config())
export const createAssociate = async payload => api.post(`/associates/create`, payload, config())
export const deleteAssociate = async id => api.delete(`/associate/${id}`, config())

//Transfers
export const getAllTransfers = async () => api.get('/getAllTransfers', config())

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