<template> 
    <div>
        <form @submit.prevent="submitForm" class="mb-3 p-3 shadow-sm bg-white rounded">
            <div class="mb-3">
                <label for="id" class="form-label">ID</label>
                <input
                    type="number"
                    v-model="form.id"
                    id="id"
                    class="form-control"
                    :disabled="isEdit"
                    required
                />
            </div>

            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input
                    type="text"
                    v-model="form.username"
                    id="username"
                    class="form-control"
                    required
                />
            </div>

            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                    type="text"
                    v-model="form.email"
                    id="email"
                    class="form-control"
                    required
                />
            </div>

            <div class="mb-3">
                <label for="role" class="form-label">Role</label>
                <input
                    type="text"
                    v-model="form.role"
                    id="role"
                    class="form-control"
                    required
                />
            </div>

            <button type="submit" class="btn btn-success">
                {{ isEdit ? 'Simpan Perubahan' : 'Tambah User' }}
            </button>
        </form>
    </div>
</template>

 
<script>
export default {
    props: {
        user: {
            type: Object,
            default: () => ({})
        },
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            form: {
                id: '',
                username: '',
                email: '',
                role: ''
            }
        }
    },
    watch: {
        user: {
            immediate: true,
            handler(newUser) {
                if (this.isEdit) {
                    this.form = { ...newUser };
                } else {
                    this.form = {
                        id: '',
                        username: '',
                        email: '',
                        role: ''
                    };
                }
            }
        }
    },
    methods: {
        submitForm() {
            this.$emit('submit', this.form);
        }
    }
};
</script>

<style scoped>
form {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
} 

.mb-3 {
    margin-bottom: 1rem;
}

.form-label {
    font-weight: bold;
    color: #4b3f6b;
}

.form-control {
    border-radius: 4px;
    border: 1px solid #ccc;
}

.form-control:focus {
    border-color: #4b3f6b;
    box-shadow: 0 0 0 0.2rem rgba(75, 63, 107, 0.25);
}

.btn-success {
    background-color: #4caf50;
    border-color: #4caf50;
}

.btn-success:hover {
    background-color: #45a049;
    border-color: #45a049;
}
</style>