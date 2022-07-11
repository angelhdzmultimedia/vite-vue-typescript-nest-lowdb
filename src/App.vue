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
  fetchUsers();
});

async function fetchUsers() {
  try {
    const { data } = await api.get('/users');
    users.value = data;
  } catch (error) {
    alert(error);
  }
}

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
  fetchUsers();
}
</script>

<template>
  <form
    method="GET"
    action="https://vitejs-vite-4cehy5-y8ymt4st--5000.local.webcontainer.io/shutdown"
  >
    <button type="submit">Stop Server</button>
  </form>
  <div class="column items-center">
    <h4>Users</h4>
    <span v-if="!users.length">No users.</span>
    <div v-else class="column users-list">
      <div v-for="user in users" class="row" :key="user.name">
        <button>Name:{{ user.name }}</button>
        <button>Email:{{ user.email }}</button>
      </div>
    </div>
  </div>

  <form @submit.prevent="createUser" class="column create-user items-center">
    <h4>Create User</h4>
    <input v-model="registerData.name" placeholder="Name" />
    <input v-model="registerData.email" placeholder="Email" />
    <input v-model="registerData.password" placeholder="Password" />
    <button type="submit">Create</button>
  </form>
</template>

<style></style>
