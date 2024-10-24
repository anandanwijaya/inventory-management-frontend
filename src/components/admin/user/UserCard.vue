<template>
    <div class="user-card">
        <div class="user-container">
            <h3>{{ user.username }}</h3>
            <p>{{ user.email }}</p>
            <p class="role">Stok: <span class="role-span"> {{ user.role }} </span></p>
        </div>
        <div class="buttons">
            <button @click="$emit('edit-user', user)" class="edit">Edit</button>
            <button @click="$emit('delete-user', user.id)" class="delete">Delete</button>
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: 1px solid #ddd;
    padding: 16px;
    margin-bottom: 10px;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
}

.user-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.user-card .user-container{
    display: flex;
    flex-direction: column;
}

.user-card h3 {
    margin: 0 0 10px;
    font-size: 1.2em;
    font-weight: 700;
    color: #333;
}

.user-card p {
    margin: 5px 0;
    color: #555;
}

.user-card .role {
    font-weight: bold;
    color: #2c3e50;
}

.user-card .role-span {
    font-weight: 500;
    color: #2c3e50;
}

.user-card .buttons {
    display: flex;
    align-self: flex-end;
    gap: 10px;
    margin-top: 10px;
}

.user-card button {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.user-card button:hover {
    background-color: #ddd;
}

.user-card button.edit {
    background-color: #4caf50;
    color: white;
}

.user-card button.edit:hover {
    background-color: #45a049;
}

.user-card button.delete {
    background-color: #e74c3c;
    color: white;
}

.user-card button.delete:hover {
    background-color: #c0392b;
}
</style>