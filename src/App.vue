<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from './api';

const users = ref([]);
const registerData = ref({
  name: '',
  email: '',
  password: '',
});

onMounted(async () => {
  reset();
  try {
    users.value = await api.get('/users');
  } catch (error) {
    alert(error);
  }
});

function reset() {
  registerData.value = {
    name: '',
    email: '',
    password: '',
  };
}

async function createUser() {
  await api.post('/users', registerData.value);
  reset();
}
</script>

<template>
  <h4>Users</h4>
  <ul>
    <li v-for="user in users" class="row"></li>
  </ul>

  <form @submit.prevent="createUser" class="column create-user">
    <h4>Create User</h4>
    <input v-model="registerData.name" placeholder="Name" />
    <input v-model="registerData.email" placeholder="Email" />
    <input v-model="registerData.password" placeholder="Password" />
    <button type="submit">Create</button>
  </form>
</template>

<style>
.row {
  display: flex;
  flex-direction: row;
}

.column {
  display: flex;
  flex-direction: column;
}

.create-user {
  gap: 10px;
}
</style>
