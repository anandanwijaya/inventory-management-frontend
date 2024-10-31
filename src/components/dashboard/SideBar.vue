<template>
    <div :class="['sidebar', { 'd-none': !isSidebarVisible }]">
        <a class="logo d-block text-center mb-4 text-white">Simbok</a>
        <ul class="nav flex-column">
            <li v-if="currentRole === 'admin'" class="nav-item">
                <a href="#" @click.prevent="showComponent('users')" class="nav-link text-white d-flex align-items-center">
                    <i class="bi bi-house-door me-2"></i> Users
                </a>
            </li>
            <li class="nav-item">
                <a href="#" @click.prevent="showComponent('items')" class="nav-link text-white d-flex align-items-center">
                    <i class="bi bi-box me-2"></i> Items
                </a>
            </li>
            <li class="nav-item">
                <a href="#" @click.prevent="showComponent('transactions')" class="nav-link text-white d-flex align-items-center">
                    <i class="bi bi-cash me-2"></i> Transactions
                </a>
            </li>
            <li v-if="currentRole == 'user'" class="nav-item">
                <a href="#" @click.prevent="showComponent('history')" class="nav-link text-white d-flex align-items-center">
                    <i class="bi bi-clock-history me-2"></i> History
                </a>
            </li>
        </ul>
    </div>
</template>


<script>
export default {
    props: {
        currentRole: {
            type: String,
            required: true,
        },
        isSidebarVisible: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        showComponent(component) {
            this.$emit('showComponent', component)
        },
    },
    emits: ['showComponent'],
}
</script>


<style scoped>

.sidebar {
    width: 200px;
    background: #4b3f6b;
    color: white;
    padding: 14px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    font-size: 18px;
    font-family: sans-serif;
    transition: transform 0.3s ease-in-out;
    transform: translateX(-2);
}

.sidebar.d-none {
transform: translateX(-200px);
}

.logo {
    font-size: 24px;
    font-weight: bold;
    color: white;
}

.nav-link {
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
    text-decoration: underline;
}

.me-2 {
    margin-right: 0.5rem;
}
</style>