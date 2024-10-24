<template>
    <div>
        <form @submit.prevent="submitForm">Submit Form
            <table>
                <tbody>
                    <tr>
                        <td>ID</td>
                        <td>
                            <input type="text" v-model="form.id" id="id" :disabled="isEdit" required />
                        </td>
                    </tr> 
                    <tr>
                        <td>Username</td>
                        <td>
                            <input type="text" v-model="form.username" id="username" required />
                        </td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>
                            <input type="text" v-model="form.email" id="email" required />
                        </td>
                    </tr>
                    <tr>
                        <td>Role</td>
                        <td>
                            <input type="text" v-model="form.role" id="role" required />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button type="submit">
                                {{ isEdit ? 'Simpan Perubahan' : 'Tambah User' }}
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
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
                // Copy user to form when editing, reset form when adding new user
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

table {
    width: 100%;
    border-collapse: collapse;
}

td {
    padding: 10px;
    border: 1px solid #ddd;
}

input[type="text"], input[type="number"] {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

button[type="submit"] {
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button[type="submit"]:hover {
    background-color: #45a049;
}
</style>