<template>
    <nav class="navbar">
        <div class="navbar-brand">
            <a href="#" class="navbar-item">Simbok</a>
        </div>

        <div class="navbar-menu">
            <div class="navbar-start">
                <a class="navbar-item" @click.prevent="navigateTo('user')"
                    >User</a
                >
                <a class="navbar-item" @click.prevent="navigateTo('item')"
                    >Item</a
                >
                <a
                    class="navbar-item"
                    @click.prevent="navigateTo('transaction')"
                    >Transaction</a
                >
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    methods: {
        navigateTo(page) {
            this.$emit('navigate-to', page)
        },
    },
}
</script>