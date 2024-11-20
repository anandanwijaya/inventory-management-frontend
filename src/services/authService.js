import apiClient from '@/plugins/axios'
import { useAuthStore } from '@/store/authStore'

export let login = async (username, password) => {
    try {
        let response = await apiClient.post('/auth/login', {
            username,
            password,
        })
        console.log('Login response:', response.data)

        if (!response.data || !response.data.data || !response.data.data.token) {
            throw new Error('Invalid response from server')
        }

        let { token, role } = response.data.data

        console.log('Token and role from login service:', token, role)

        let authStore = useAuthStore()

        authStore.setToken(token)
        authStore.setRole(role)

        console.log(
            'Token and role saved in store:',
            authStore.token,
            authStore.role
        )

        return response.data.data
    } catch (error) {
        console.error('Error during login:', error)
        throw new Error(error.response?.data?.message || error.message)
    }
}

export let register = async (username, email, password) => {
    try {
        let response = await apiClient.post('/auth/register', {
            username,
            email,
            password,
        })

        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message)
    }
}