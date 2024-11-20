<template>
    <div class="transaction-form">
        <form @submit.prevent="submitForm"> 
            <h2>Pengembalian Barang</h2>

            <div>
                <label for="kode">Kode Transaction:</label>
                <input type="text" v-model="form.kode" id="kode" :disabled="true" />
            </div>

            <div>
                <label for="namaKaryawan">Nama Karyawan:</label>
                <input type="text" v-model="form.namaKaryawan" id="namaKaryawan" :disabled="true" />
            </div>

            <div>
                <label for="namaBarang">Nama Barang:</label>
                <input type="text" v-model="form.namaBarang" id="namaBarang" :disabled="true" />
            </div>

            <div>
                <label for="jumlahPinjam">Jumlah Pinjam:</label>
                <input type="number" v-model="form.jumlahPinjam" id="jumlahPinjam" :disabled="true" />
            </div>

            <div>
                <label for="tanggalPinjam">Tanggal Pinjam:</label>
                <input type="text" v-model="form.tanggalPinjam" id="tanggalPinjam" :disabled="true" />
            </div>

            <div>
                <label for="tanggalPengembalian">Tanggal Pengembalian:</label>
                <input type="text" v-model="form.tanggalPengembalian" id="tanggalPengembalian" :disabled="true" />
            </div>

            <div class="button-container">
                <button type="button" @click="cancelForm">Batal</button>
                <button type="submit">Ajukan</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        transaction: Object,
    },
    data() {
        return {
            form: {
                kode: this.transaction ? this.transaction.kode : '',
                namaKaryawan: this.transaction ? this.transaction.namaKaryawan : '',
                namaBarang: this.transaction ? this.transaction.namaBarang : '',
                jumlahPinjam: this.transaction ? this.transaction.jumlahPinjam : 1,
                tanggalPinjam: this.transaction ? this.transaction.tanggalPinjam : '',
                tanggalPengembalian: this.transaction ? this.transaction.tanggalPengembalian : '',
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
    },
    watch: {
        transaction(newTransaction) {
            if (newTransaction) {
                this.form.kode = newTransaction.kode
                this.form.namaKaryawan = newTransaction.namaKaryawan
                this.form.namaBarang = newTransaction.namaBarang
                this.form.jumlahPinjam = newTransaction.jumlahPinjam
                this.form.tanggalPinjam = newTransaction.tanggalPinjam
                this.form.tanggalPengembalian = newTransaction.tanggalPengembalian
            }
        }
    }
}
</script>

<style scoped>

form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    margin: auto;
    background: #f0f0f0;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

label {
    margin-top: 10px;
}

input {
    padding: 5px;
    margin-top: 5px;
}

.button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

button {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 4px;
}

button:hover {
    background-color: #45a049;
}

button[type='button'] {
    background-color: #f44336;
}

button[type='button']:hover {
    background-color: #e31b0c;
}
</style>