import axios from 'axios'
const URL = 'https://fruitseasonms.azurewebsites.net'

const instance = axios.create({
    baseURL: URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const login = async (credential) => {
    const response = await instance.post('/api/auths/login', credential)
    return response.data
}
