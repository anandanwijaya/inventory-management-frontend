<template>
    <div class="user-card card mb-3 shadow-sm">
        <div class="card-body">
            <h3 class="card-title">{{ user.username }}</h3>
            <p class="card-text">{{ user.email }}</p>
            <p class="card-text role">{{ user.role }}</p>
        
            <div class="buttons d-flex gap-2 mt-3">
                <button @click="$emit('edit-user', user)" class="btn btn-success edit">Edit</button>
                <button @click="$emit('delete-user', user.id)" class="btn btn-danger delete">Delete</button>
            </div>
        </div>
    </div>
</template>


<script> 
export default {
    name: 'UserCard',
    props: {
        user: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>

.user-card {
    transition: transform 0.2s, box-shadow 0.2s;
}

.user-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.user-card .card-title {
    margin: 0 0 10px;
    font-size: 1.5rem;
    color: #333;
}

.user-card .card-text {
    margin: 5px 0;
    color: #555;
}

.user-card .buttons .btn {
    transition: background-color 0.2s, border-color 0.2s;
}

.user-card .buttons .btn:hover {
    background-color: darken(#28a745, 10%);
    border-color: darken(#28a745, 10%);
}

.user-card .buttons .btn.delete:hover {
    background-color: darken(#dc3545, 10%);
    border-color: darken(#dc3545, 10%);
}
</style>