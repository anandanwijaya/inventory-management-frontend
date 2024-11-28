<template>
    <div>
        <form @submit.prevent="submitForm" class="mb-3 p-3 shadow-sm bg-white rounded">
            <div class="mb-3">
                <label for="id" class="form-label">ID Transaction</label>
                <input
                    type="number"
                    v-model="form.id"
                    id="id"
                    class="form-control"
                    disabled
                />
            </div>


            <div class="mb-3">
                <label for="username" class="form-label">Nama Karyawan</label>
                <input
                    type="text"
                    v-model="form.username"
                    id="username"
                    class="form-control"
                    disabled
                />
            </div>
            
            <div class="mb-3">
                <label for="name" class="form-label">Nama Barang</label>
                <input
                    type="text"
                    v-model="form.name"
                    id="name"
                    class="form-control"
                    disabled
                />
            </div>
            
            <div class="mb-3">
                <label for="quantityBorrowed" class="form-label">Jumlah Pinjam:</label>
                <input
                    type="number"
                     v-model="form.quantityBorrowed"
                    id="quantityBorrowed"
                    class="form-control"
                    disabled
                />
            </div>
            
            <div class="mb-3">
                <label for="borrowedAt" class="form-label">Tanggal Pinjam:</label>
                <input
                    type="text"
                    v-model="form.borrowedAt"
                    id="borrowedAt"
                    class="form-control"
                    disabled
                />
            </div>
            
            <div class="mb-3">
                <label for="returnedAt" class="form-label">Tanggal Pengembalian:</label>
                <input
                    type="date"
                    v-model="form.returnedAt"
                    id="returnedAt"
                    class="form-control"
                    disabled
                />
            </div>

            <button type="submit" class="btn btn-success">Kembalikan</button>
            
        </form>
    </div>
</template>
>

<script>
export default {
    props: {
        transaction: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            form: {
                id: this.transaction ? this.transaction.id : '',
                userId: this.transaction ? this.transaction.userId : '',
                username: this.transaction ? this.transaction.user.username : '',
                itemId: this.transaction ? this.transaction.itemId : '',
                name: this.transaction ? this.transaction.item.name : '',
                quantityBorrowed: this.transaction ? this.transaction.quantityBorrowed : 1,
                borrowedAt: this.transaction ? this.transaction.borrowedAt : '',
                returnedAt: '',
                status: this.transaction ? 'RETURNED' : '',
            }
        }
    },
    methods: {
        submitForm() {
            this.$emit('submit', { ...this.form })
        },
        cancelForm() {
            this.$emit('cancel')
        }
    }
}
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