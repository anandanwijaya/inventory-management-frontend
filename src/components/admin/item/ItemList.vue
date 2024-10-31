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
                v-for="item in items"
                :key="item.kode"
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
import ItemCard from './ItemCard.vue'
import Modal from '../../Modal.vue'
import ItemForm from './ItemForm.vue'

export default {
    components: {
        ItemCard,
        Modal,
        ItemForm,
    },
    data() {
        return {
            items: [
                {
                    kode: '2024001',
                    nama: 'Acer Nitro 15 AN515-58',
                    deskripsi: 'Intel Core i5 12500H, RTX 3050, RAM 8GB DDR4, LAYAR 15.6',
                    stok: 80,
                },
                {
                    kode: '2024002',
                    nama: 'Lenovo LOQ 15 15IRH8',
                    deskripsi: 'Intel Core i5 13450H, RTX 3050, RAM 8GB DDR4, LAYAR 15.6',
                    stok: 80,
                },
            ],
            showForm: false,
            selectedItem: null,
            isEdit: false,
        }
    },
    methods: {
        showAddForm() {
            this.selectedItem = {
                kode: '',
                nama: '',
                deskripsi: '',
                stok: 0,
            },
            this.isEdit = false
            this.showForm = true
        },
        editItem(item) {
            this.selectedItem = { ...item }
            this.isEdit = true
            this.showForm = true
        },
        handleSubmit(item) {
            if (
                item.kode &&
                item.nama &&
                item.deskripsi &&
                item.stok !== null &&
                !isNaN(item.stok)
            ) {
                if (this.isEdit) {
                    let index = this.items.findIndex(
                        (i) => i.kode === item.kode
                    )
                    this.items[index] = item
                } else {
                    this.items.push(item)
                }
            }
            this.showForm = false
        },
        cancelEditForm() {
            this.showForm = false
            this.selectedItem = null
            this.isEdit = false
        },
        deleteItem(kode) {
            this.items = this.items.filter((item) => item.kode !== kode)
            this.$emit('delete-item', kode)
        },
    },
}
</script>

<style scoped>

.item-list {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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