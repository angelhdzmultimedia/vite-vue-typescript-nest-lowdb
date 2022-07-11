<script setup lang="ts">
import { ref, onMounted } from 'vue';
</script>

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
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style></style>
