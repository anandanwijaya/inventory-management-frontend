import { defineStore } from 'pinia'
import apiClient from '@/plugins/axios'

export let useUserStore = defineStore('userStore', {
    state: () => ({
        users: []
    }),
    actions: {
        async fetchUsers() {
            try {
                let response = await apiClient.get('/users')
                this.users = response.data
            } catch (error) {
                console.error('Failed to fetch users:', error)
            }
        },
        async addUser(user) {
            try {
                let response = await apiClient.post('/users', user)
                this.users.push(response.data)
            } catch (error) {
                console.error('Failed to add user:', error.message)
            }
        },
        async updateUser(user) {
            try {
                let response = await apiClient.patch(
                    `/users/${user.id}`,
                    user
                )
                let index = this.users.findIndex((u) => u.id === user.id)
                if (index !== -1) {
                    this.users.splice(index, 1, response.data)
                }
            } catch (error) {
                console.error('Failed to update user:', error)
            }
        },
        async deleteUser(id) {
            try {
                await apiClient.delete(`/users/${id}`)
                this.users = this.users.filter((user) => user.id !== id)
            } catch (error) {
                console.error('Failed to delete user:', error)
            }
        }
    }
})
