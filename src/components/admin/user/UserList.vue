<template>
    <div class="user-list">
        <div class="header">
            <h2>Daftar User</h2>
            <button class="add-btn" @click="showAddForm">Tambah User</button>
        </div> 

        <div class="user-card">
            <UserCard v-for="user in users" :key="user.kode" :user="user" @edit-user="editUser" @delete-user="deleteUser" />
        </div>

        <Modal :visible="showForm" @close="cancelEditForm">
            <UserForm :user="selectedUser" :isEdit="isEdit" @submit="handleSubmit" @cancel="cancelEditForm" />
        </Modal> 
    </div>
</template> 


<script>
import UserCard from './UserCard.vue'
import Modal from '../Modal.vue'
import UserForm from './UserForm.vue'

export default {
    components: {
        UserCard,
        Modal,
        UserForm
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
            isEdit: false
        }
    },
    methods: {
        showAddForm(){
            this.selectedUser = {id: 0, username: '', email: '', role: ''},
            this.isEdit = false
            this.showForm = true
        },
        editUser(user){
            this.selectedUser = {...user},
            this.isEdit = true
            this.showForm = true  
        },
        handleSubmit(user){
            if (user.id && user.username && user.email && user.role !== null && !isNaN(user.id)) {
                if(this.isEdit){
                    let index = this.users.findIndex((i) => i.id === user.id)
                    this.users[index] = user
                }else {
                    this.users.push(user)
                }
                this.showForm = false
            }
        },
        cancelEditForm(){
            this.showForm = false
            this.selectedUser = null
            this.isEdit = false
        },
        deleteUser(id) {
            this.users = this.users.filter((user) => user.id !== id)
            this.$emit("delete-user", id)
        }
    }
}
</script>


<style scoped>
.user-list {
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

.table-responsive {
    width: 100%;
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    border: 1px solid #ddd;
    padding: 12px 15px;
    text-align: center;
    vertical-align: middle;
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
    padding: 6px 12px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
}

.edit-btn {
    background-color: #4caf50;
    color: white;
    margin-right: 5px;
}

.edit-btn:hover {
    background-color: #45a049;
}

.delete-btn {
    background-color: #f44336;
    color: white;
}

.delete-btn:hover {
    background-color: #d32f2f;
}

@media (max-width: 600px) {
    
    th, td {
        padding: 8px 10px;
    }

    .action-buttons {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .action-buttons button {
        margin: 5px 0;
    }
}
</style>