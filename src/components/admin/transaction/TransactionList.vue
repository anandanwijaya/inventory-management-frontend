<template>
    <div class="transaction-list">
        <h2>Daftar Transaksi</h2>
        <div class="table-responsive">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama Karyawan</th>
                        <th>Nama Barang</th>
                        <th>Jumlah Pinjam</th>
                        <th>Tanggal Pinjam</th>
                        <th>Tanggal Pengembalian</th>
                        <th>Status</th>
                        <th class="action-column">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="transaction in filteredTransactions"
                        :key="transaction.id"
                    >
                        <td>{{ transaction.id }}</td>
                        <td>{{ transaction.user.username }}</td>
                        <td>{{ transaction.item.name }}</td>
                        <td>{{ transaction.quantityBorrowed }}</td>
                        <td>{{ (transaction.borrowedAt).split('T')[0] }}</td>
                        <td>{{ transaction.returnedAt ? (transaction.returnedAt).split('T')[0] : transaction.returnedAt }}</td>
                        <td>{{ transaction.status }}</td>
                        <td class="action-buttons">
                            <button
                                class="verif-btn"
                                @click="openReturnForm(transaction)"
                                :disabled="transaction.status === 'BORROWED' || transaction.status === 'RETURNED'"
                            >
                                {{ transaction.status == "PENDING" ? "VERIFIKASI" : "DONE" }}
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Modal :visible="showForm" @close="cancelReturnForm">
            <TransactionForm
                :transaction="selectedTransaction"
                @submit="handleReturn"
                @cancel="cancelReturnForm"
            />
        </Modal>
    </div>
</template>


<script>
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/store/authStore'
import { useTransactionStore } from '@/store/transactionStore'
import TransactionForm from '@/components/admin/transaction/TransactionForm.vue'
import Modal from '@/components/Modal.vue'
import eventBus from '@/utils/EventBus'

export default {
    components: {
        Modal,
        TransactionForm
    },
    setup() {
        let transactionStore = useTransactionStore()
        let authStore = useAuthStore()
        let transactions = computed(() => transactionStore.transactions)

        onMounted(() => {
            if (authStore.token) {
                transactionStore.fetchTransactions()
            } else {
                console.error('transaction is not authenticated')
            }
        })

        return {
            transactions,
            transactionStore,
            // addTransaction: transactionStore.addTransaction,
            updateTransaction: transactionStore.updateTransaction,
            // returnTransaction: transactionStore.returnTransaction
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
    methods: {
        openReturnForm(transaction) {
            this.selectedTransaction = { ...transaction }
            this.showForm = true
        },
        async handleReturn(transaction) {
            await this.transactionStore.updateTransaction(transaction)
            await this.transactionStore.fetchTransactions()
            this.cancelReturnForm()
        },
        cancelReturnForm() {
            this.showForm = false
            this.selectedTransaction = null
        },
        
        handleSearch(query) {
            this.searchQuery = query
        }
    },
    mounted() {
        eventBus.on('search', this.handleSearch)
    },
    beforeUnmount() {
        eventBus.off('search', this.handleSearch)
    },
}
</script>

<style scoped>
.transaction-list {
    padding: 24px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 20px 0;
}

h2 {
    margin-bottom: 20px;
    color: #4b3f6b;
    text-align: center;
    font-size: 24px;
}

.table-responsive {
    width: 100%;
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: center;
}

th {
    background-color: #4b3f6b;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}

tr:hover {
    background-color: #ddd;
}

button {
    padding: 8px 12px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
}

.verif-btn {
    background-color: #754bc5;
    color: white;
}

.verif-btn:hover {
    background-color: #5a37a0;
}

.verif-btn[disabled] {
    background-color: #ccc;
    cursor: not-allowed;
}

@media (max-width: 600px) {
    th,
    td {
        padding: 8px 10px;
    }

    .action-buttons {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
}
</style>
