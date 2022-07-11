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
        <q-toolbar-title><q-icon name="coffee" /></q-toolbar-title>
        <div v-if="!currentUser.isLoggedIn">
          <router-link to="/login" custom v-slot="{ navigate }">
            <q-btn @click="navigate" @keypress.enter="navigate" role="link"
              >Login</q-btn
            >
          </router-link>
          <router-link to="/register" custom v-slot="{ navigate }">
            <q-btn @click="navigate" @keypress.enter="navigate" role="link"
              >Register</q-btn
            >
          </router-link>
        </div>
        <q-btn flat :label="currentUser.firstName">
          <q-menu>
            <q-list>
              <q-item clickable>
                <q-item-section>Profile</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
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
