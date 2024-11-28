<template>
    <div class="item-list">
        <div class="header">
            <h2>Daftar Barang</h2>
            <button class="add-btn" @click="showAddForm">
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
            if (item.name && item.description && item.quantity !== null && !isNaN(item.quantity)) {
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
    padding: 24px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 20px 0;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

h2 {
    color: #4b3f6b;
    font-size: 24px;
}

.add-btn {
    background-color: #754bc5;
    color: white;
    padding: 6px 12px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
}

.add-btn:hover {
    background-color: #5a37a0;
}
</style>