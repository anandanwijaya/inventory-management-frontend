<template>
    <div class="item-list">
        <h2>Daftar Barang</h2>
        <div class="table-responsive">
            <table>
                <thead>
                    <tr>
                        <th>ID Barang</th>
                        <th>Nama Barang</th>
                        <th>Deskripsi</th>
                        <th>Stok</th>
                        <th class="action-column">Aksi</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="item in filteredItems" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.description }}</td>
                        <td>{{ item.quantity }}</td>

                        <td class="action-buttons">
                            <button
                                class="borrow-btn"
                                @click="borrowItem(item)"
                            >
                                Pinjam
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Modal :visible="showForm" @close="cancelBorrowForm">
            <ItemForm
                :item="selectedItem"
                @submit="handleBorrow"
                @cancel="cancelBorrowForm"
            />
        </Modal>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/store/authStore'
import { useItemStore } from '@/store/itemStore'
import { useTransactionStore } from '@/store/transactionStore'
import Modal from '@/components/Modal.vue'
import ItemForm from '@/components/user/item/ItemForm.vue'
import eventBus from '@/utils/EventBus'

export default {
    components: {
        Modal,
        ItemForm,
    },
    setup() {
        let itemStore = useItemStore()
        let authStore = useAuthStore()
        let transactionStore = useTransactionStore()
        let items = computed(() => itemStore.items)

        onMounted(() => {
            if (authStore.token) {
                itemStore.fetchItems()
            } else {
                console.error('item is not authenticated')
            }
        })

        return {
            items,
            itemStore,
            transactionStore,
            addTransaction: transactionStore.addTransaction,
        }
    },
    data() {
        return {
            showForm: false,
            selectedItem: null,
            searchQuery: '',
        }
    },
    computed: {
        filteredItems() {
            return this.items.filter((item) =>
                item.name
                    .toLowerCase()
                    .includes(this.searchQuery.toLowerCase())
            )
    }},
    methods: {
        borrowItem(item) {
            this.selectedItem = { ...item }
            this.showForm = true
        },
        async handleBorrow(item) {
            await this.transactionStore.addTransaction(item)
            await this.itemStore.fetchItems()
            this.showForm = false
        },
        cancelBorrowForm() {
            this.showForm = false
            this.selectedItem = null
        },
        handleSearch(query) {
            this.searchQuery = query
        },
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
.item-list {
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

.action-column {
    width: 100px;
    text-align: center;
}

button {
    padding: 8px 12px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
    margin: 0 2px;
}

.borrow-btn {
    background-color: #754bc5;
    color: white;
}

.borrow-btn:hover {
    background-color: #5a37a0;
}

@media (max-width: 600px) {
    th,
    td {
        padding: 8px 10px;
    }

    .action-buttons {
        flex-direction: column;
        align-items: stretch;
    }
}
</style>
