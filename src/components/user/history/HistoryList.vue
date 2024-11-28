<template>
    <div class="history-list">
        <h2>Riwayat Peminjaman</h2>
        <div class="table-responsive">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama Barang</th>
                        <th>Jumlah Pinjam</th>
                        <th>Tanggal Pinjam</th>
                        <th>Tanggal Kembali</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="history in transactions" :key="history.id">
                        <td>{{ history.id }}</td>
                        <td>{{ history.item.name }}</td>
                        <td>{{ history.quantityBorrowed }}</td>
                        <td>{{ (history.borrowedAt).split('T')[0] }}</td>
                        <td>{{ (history.returnedAt).split('T')[0] }}</td>
                        <td :class="['status', history.status.toLowerCase()]">{{ history.status }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/store/authStore'
import { useTransactionStore } from '@/store/transactionStore'
import TransactionForm from '@/components/user/transaction/TransactionForm.vue'
import eventBus from '@/utils/EventBus'

export default {
    setup() {
        let transactionStore = useTransactionStore()
        let authStore = useAuthStore()
        let transactions = computed(() => transactionStore.transactions.filter(a => a.status !== 'PENDING'))

        onMounted(() => {
            if (authStore.token) {
                transactionStore.fetchTransactionsByUserId()
            } else {
                console.error('transaction is not authenticated')
            }
        })

        return {
            transactions,
            transactionStore,
        }
    },
    data() {
        return {
            showForm: false,
            selectedTransaction: null,
            isEdit: false,
            searchQuery: ''
        }
    },
    computed: {
        filteredTransactions() {
            return this.transactions.filter((transaction) =>
                transaction.item.name
                .toLowerCase()
                .includes(this.searchQuery.toLowerCase())
            )
    }},
    mounted() {
        eventBus.on('search', this.handleSearch)
    },
    beforeUnmount() {
        eventBus.off('search', this.handleSearch)
    },
}
</script>

<style scoped>

.history-list {
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 8px 0;
}

h2 {
    margin-bottom: 20px;
    color: #4b3f6b;
    text-align: center;
    font-size: 24px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th, td {
    border: 1px solid #ddd;
    padding: 12px 15px;
    text-align: center;
}

th {
    background-color: #4b3f6b;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

.table-responsive {
    width: 100%;
    overflow-x: auto;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}

tr:hover {
    background-color: #ddd;
}

.status {
    text-transform: capitalize;
    font-weight: bold;
    color: #fff;
    padding: 5px 10px;
    border-radius: 4px;
    text-align: center;
}

.status.borrowed {
    background-color: #f0ad4e;
}

.status.returned {
    background-color: #5cb85c;
}
</style>