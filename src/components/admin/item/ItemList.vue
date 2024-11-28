<template>
    <div class="item-list container py-4 bg-white rounded shadow-sm">
        <div class="header d-flex justify-content-between align-items-center mb-3">
            <h2>Daftar Barang</h2>
            <button class="btn btn-primary" @click="showAddForm">
                Tambah Item
            </button>
        </div>

        <div class="item-cards row">
            <ItemCard
                v-for="item in filteredItems"
                :key="item.id"
                :item="item"
                @edit-item="editItem"
                @delete-item="deleteItem"
                class="col-md-6 mb-4"
            />
        </div>

        <Modal :visible="showForm" @close="cancelEditForm">
            <ItemForm
                :item="selectedItem"
                :isEdit="isEdit"
                @submit="handleSubmit"
                @cancel="cancelEditForm"
            />
        </Modal>
    </div>
</template>


<script>
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/store/authStore'
import { useItemStore } from '@/store/itemStore'
import ItemCard from '@/components/admin/item/ItemCard.vue'
import Modal from '@/components/Modal.vue'
import ItemForm from '@/components/admin/item/ItemForm.vue'
import eventBus from '@/utils/EventBus'

export default {
    components: {
        ItemCard,
        Modal,
        ItemForm
    },
    setup() {
        let itemStore = useItemStore()
        let authStore = useAuthStore()
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
            addItem: itemStore.addItem,
            updateItem: itemStore.updateItem,
            deleteItem: itemStore.deleteItem
        }
    },
    data() {
        return {
            showForm: false,
            selectedItem: null,
            isEdit: false,
            searchQuery: ''
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
        showAddForm() {
            this.selectedItem = { id: '', name: '', description: '', quantity: '' }
            this.isEdit = false
            this.showForm = true
        },
        editItem(item) {
            this.selectedItem = { ...item }
            this.isEdit = true
            this.showForm = true
        },
        async handleSubmit(item) {
            if (item.id && item.name && item.description && item.quantity !== null && !isNaN(item.quantity)) {
                if (this.isEdit) {
                    await this.itemStore.updateItem(item)
                } else {
                    await this.itemStore.addItem(item)
                }
                this.showForm = false
            }
        },
        cancelEditForm() {
            this.showForm = false
        },
        async deleteItem(id) {
            await this.itemStore.deleteItem(id)
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
.item-list {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 5vh;
}

.header h2 {
    color: #4b3f6b;
    font-size: 24px;
}

.header .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
}

.header .btn-primary:hover {
    background-color: #0056b3;
    border-color: #0056b3;
}
</style>