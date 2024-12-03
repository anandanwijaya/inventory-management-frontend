import { defineStore } from 'pinia'
import apiClient from '@/plugins/axios'

export let useTransactionStore = defineStore('transactionStore', {
    state: () => ({
        transactions: []
    }),
    getters: {
        getTransactionById: (state) => (id) => {
            return state.transactions.find((transaction) => transaction.id === id)
        },
        totalTransactions: (state) => state.transactions.length,
    }, 
    actions: {
        async fetchTransactions() {
            try {
                let response = await apiClient.get('/transactions')
                this.transactions = response.data
            } catch (error) {
                console.error('Failed to fetch transactions:', error)
            }
        },
        async fetchTransactionsByUserId() {
            try {
                let response = await apiClient.get('/transactions/user')
                this.transactions = response.data
            } catch (error) {
                console.error('Failed to fetch transactions:', error)
            }
        },
        async addTransaction(item) {
            try {
                await apiClient.post('/transactions/borrow', item)
                // Jangan di push apabila ada includes
            } catch (error) {
                console.error('Failed to add transaction:', error.message)
            }
        },
        async updateTransaction(transaction) {
            try {
                await apiClient.patch(`/transactions/verify/${transaction.id}`, transaction)
            } catch (error) {
                console.error('Failed to update transaction:', error)
            }
        },
        async returnTransaction(transaction) {
            try {
                let response = await apiClient.post(`/transactions/return/${transaction.id}`)
            } catch (error) {
                console.error('Failed to return transaction:', error)
            }
        },
    }
})