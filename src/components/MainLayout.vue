<template>
  <q-layout>
    <q-header>
      <q-toolbar>
        <form
          method="GET"
          action="https://vitejs-vite-4cehy5-y8ymt4st--5000.local.webcontainer.io/shutdown"
        >
          <q-btn color="white" text-color="primary" type="submit"
            >Stop Server</q-btn
          >
        </form>
        <q-toolbar-title>My App</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container class="column full-width full-height q-pa-md">
      <slot name="page" />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { useAuthStore } from '../stores/auth';

const { currentUser } = useAuthStore();
</script>
