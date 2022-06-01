import { useState } from 'react'

export default function useAuth(){
    const getAuth = () => {
        const authString = localStorage.getItem('auth')
        const authToken = JSON.parse(authString)
        return authToken
    }

    const [ auth, setAuth ] = useState(getAuth())

    const saveToken = authToken => {
        localStorage.setItem('auth', JSON.stringify(authToken))
        setAuth(authToken)
    }

    return {
        setAuth: saveToken,
        auth
    }
}