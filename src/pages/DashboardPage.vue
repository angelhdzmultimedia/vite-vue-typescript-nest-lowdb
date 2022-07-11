<template>
  <q-page> Welcome, {{ currentUser.displayName }}! </q-page>
</template>

<script lang="ts" setup>
import { mapStores } from 'pinia';
import { useAuthStore } from '../stores/auth';
import { computed } from 'vue';

const authStore = useAuthStore();
const { currentUser } = mapStores(authStore);
const welcome = computed(() => {
  return `Welcome, ${
    currentUser.isLoggedIn ? currentUser.displayName : 'Guest'
  }!`;
});
</script>
