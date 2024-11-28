<template>
    <div>
        <form @submit.prevent="submitForm" class="mb-3 p-3 shadow-sm bg-white rounded">
            <div class="mb-3">
                <label for="id" class="form-label">ID Barang</label>
                <input
                    type="number"
                    v-model="form.id"
                    id="id"
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
                <label for="description" class="form-label">Deskripsi</label>
                <input
                    type="text"
                    v-model="form.description"
                    id="description"
                    class="form-control"
                    disabled
                />
            </div>

            <div class="mb-3">
                <label for="quantity" class="form-label">Quantity</label>
                <input
                    type="number"
                    v-model="form.quantity"
                    id="quantity"
                    class="form-control"
                />
            </div>

            <button type="submit" class="btn btn-success">Pinjam Barang</button>
        </form>
    </div>
</template>
>

<script>
export default {
    props: {
        item: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            form: {
                itemId: '',
                id: this.item.id,
                name: this.item.name,
                description: this.item.description,
                quantity: 0,
                quantityBorrowed: 0
            },
        }
    },
    watch: {
        item: {
            immediate: true,
            handler(newItem) {
                this.form = { ...newItem }
            },
        },
    },
    methods: {
        submitForm() {
            this.form = {
                itemId: this.form.id,
                quantityBorrowed: this.form.quantity
            }
            // alert(this.form.quantityBorrowed)
            this.$emit('submit', this.form)
        },
    },
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