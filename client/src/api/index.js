import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
})

let config;
if (window.localStorage.getItem('token')){
    config = {
        headers: {
            'x-access-token': JSON.parse(window.localStorage.getItem('token')).token
        }
    }
}


export const getAllUsers = () => api.get('/getAllUsers', config)
export const createUser = payload => api.post(`/users/create`, payload, config)
export const updateUser = (id, payload) => api.put(`/user/${id}`, payload, config)
export const deleteUser = id => api.delete(`/user/${id}`, config)
// export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
// export const getMovieById = id => api.get(`/movie/${id}`)

const apis = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
    // updateMovieById,
    // getMovieById,
}

export default apis