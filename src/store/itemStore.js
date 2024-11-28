import { defineStore } from 'pinia'
import apiClient from '@/plugins/axios'

export let useItemStore = defineStore('itemStore', {
    state: () => ({
        items: []
    }),
    actions: {
        async fetchItems() {
            try {
                let response = await apiClient.get('/items')
                this.items = response.data
            } catch (error) {
                console.error('Failed to fetch items:', error)
            }
        },
        async addItem(item) {
            try {
                let response = await apiClient.post('/items', item)
                this.items.push(response.data)
            } catch (error) {
                console.error('Failed to add item:', error.message)
            }
        },
        async updateItem(item) {
            try {
                let response = await apiClient.put(
                    `/items/${item.id}`,
                    item
                )
                let index = this.items.findIndex((u) => u.id === item.id)
                if (index !== -1) {
                    this.items.splice(index, 1, response.data)
                }
            } catch (error) {
                console.error('Failed to update item:', error)
            }
        },
        async deleteItem(id) {
            try {
                await apiClient.delete(`/items/${id}`)
                this.items = this.items.filter((item) => item.id !== id)
            } catch (error) {
                console.error('Failed to delete item:', error)
            }
        }
    }
})