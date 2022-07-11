<template>
  <q-page class="column items-center full-width">
    <form
      method="GET"
      action="https://vitejs-vite-4cehy5-y8ymt4st--5000.local.webcontainer.io/shutdown"
    >
      <q-btn type="submit">Stop Server</q-btn>
    </form>

    <q-form @submit.prevent="login" class="column q-gutter-sm">
      <h4>Login</h4>
      <q-input filled v-model="formData.login.email" placeholder="Email" />
      <q-input
        filled
        v-model="formData.login.password"
        placeholder="Password"
      />
      <q-btn color="primary" type="submit">Login</q-btn>
      <div class="column full-width q-mt-lg q-gutter-sm items-center">
        <span>Don't have an account?</span>
        <q-btn @click="$router.push('/register')">Register</q-btn>
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts" setup>
import { useAuthStore } from '../stores/auth';

const { currentUser, formData, login } = useAuthStore();
</script>
