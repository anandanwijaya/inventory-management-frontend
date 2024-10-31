<template>
    <div class="user-list container py-4 bg-white rounded shadow-sm">
        <div class="header d-flex justify-content-between align-items-center mb-3">
            <h2>Daftar User</h2>
            <button class="btn btn-primary" @click="showAddForm">
                Tambah User
            </button> 
        </div>

        <div class="user-card row">
            <UserCard
                v-for="user in users"
                :key="user.kode"
                :user="user"
                @edit-user="editUser"
                @delete-user="deleteUser"
                class="col-md-6 mb-4"
            />
        </div>

        <Modal :visible="showForm" @close="cancelEditForm">
            <UserForm
                :user="selectedUser"
                :isEdit="isEdit"
                @submit="handleSubmit"
                @cancel="cancelEditForm"
            />
        </Modal>
    </div>
</template>

<script>
import UserCard from './UserCard.vue'
import Modal from '../../Modal.vue'
import UserForm from './UserForm.vue'

export default {
    components: {
        UserCard,
        Modal,
        UserForm,
    },
    data() {
        return {
            users: [
                {
                    id: 1,
                    username: 'Nanda',
                    email: 'nanda@gmail.com',
                    role: 'Admin',
                },
                {
                    id: 2,
                    username: 'Wendy',
                    email: 'wendy@gmail.com',
                    role: 'User',
                },
            ],
            showForm: false,
            selectedUser: null,
            isEdit: false,
        }
    },
    methods: {
        showAddForm() {
            this.selectedUser = { id: 0, username: '', email: '', role: '' }
            this.isEdit = false
            this.showForm = true
        },
        editUser(user) {
            this.selectedUser = { ...user }
            this.isEdit = true
            this.showForm = true
        },
        handleSubmit(user) {
            if (
                user.id &&
                user.username &&
                user.email &&
                user.role !== null &&
                !isNaN(user.id)
            ) {
                if (this.isEdit) {
                    let index = this.users.findIndex((i) => i.id === user.id)
                    this.users[index] = user
                } else {
                    this.users.push(user)
                }
                this.showForm = false
            }
        },
        cancelEditForm() {
            this.showForm = false
            this.selectedUser = null
            this.isEdit = false
        },
        deleteUser(id) {
            this.users = this.users.filter((user) => user.id !== id)
            this.$emit('delete-user', id)
        },
    },
}
</script>

<style scoped>
.user-list {
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