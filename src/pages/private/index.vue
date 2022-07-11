<template>
  <MainLayout>
    <template #page>
      <q-page class="">{{ welcome }}</q-page>
    </template>
  </MainLayout>
</template>

<script lang="ts" setup>
import MainLayout from '../../components/MainLayout.vue';
import { useAuthStore } from '../../stores/auth';
import { computed } from 'vue';

const { currentUser } = useAuthStore();
const welcome = computed(() => {
  return `Welcome, ${
    currentUser.isLoggedIn ? currentUser.displayName : 'Guest'
  }!`;
});
</script>
