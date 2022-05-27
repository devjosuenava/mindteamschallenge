import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
})

export const createUser = payload => api.post(`/users/create`, payload)
export const getAllUsers = () => api.get(`/users`)
// export const insertMovie = payload => api.post(`/movie`, payload)
// export const getAllMovies = () => api.get(`/movies`)
// export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
// export const deleteMovieById = id => api.delete(`/movie/${id}`)
// export const getMovieById = id => api.get(`/movie/${id}`)

const apis = {
    createUser,
    getAllUsers
    // getAllMovies,
    // updateMovieById,
    // deleteMovieById,
    // getMovieById,
}

export default apis