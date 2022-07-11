<template>
  <q-page class="column items-center full-width">
    <h4>Register</h4>
    <q-form @submit.prevent="register" class="column q-gutter-sm">
      <q-input
        filled
        v-model="formData.register.displayName"
        placeholder="Display Name"
      />
      <q-input
        filled
        v-model="formData.register.firstName"
        placeholder="First Name"
      />
      <q-input
        filled
        type="email"
        v-model="formData.register.email"
        placeholder="Email"
      />
      <q-input
        filled
        :type="formData.register.isPasswordHidden ? 'password' : 'text'"
        v-model="formData.register.password"
        placeholder="Password"
      >
        <template #append>
          <q-icon
            class="cursor-pointer"
            @click="
              formData.register.isPasswordHidden =
                !formData.register.isPasswordHidden
            "
            :name="
              formData.register.isPasswordHidden
                ? 'visibility_off'
                : 'visibility'
            "
          />
        </template>
      </q-input>

      <q-btn color="primary" type="submit">Register</q-btn>
    </q-form>
  </q-page>
</template>

<script lang="ts" setup>
import { useAuthStore } from '../stores/auth';

const { currentUser, formData, register, roles } = useAuthStore();
</script>
