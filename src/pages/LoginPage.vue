<template>
  <MainLayout>
    <template #page>
      <q-page class="column items-center full-width">
        <q-spinner v-if="isLoggingIn" color="primary" size="3em"/>
        <div v-else>
          <h4>Login</h4>
        <q-form @submit.prevent="login" class="column q-gutter-sm">
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
        </div>
      </q-page>
    </template>
  </MainLayout>
</template>

<script lang="ts" setup>
import MainLayout from '../components/MainLayout.vue';
import { useAuthStore } from '../stores/auth';

const { currentUser, formData, login, redirectUrl, isLoggingIn } = useAuthStore();
</script>
