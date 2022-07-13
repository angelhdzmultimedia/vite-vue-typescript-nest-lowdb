<template>
  <MainLayout>
    <template #page>
      <q-page class="column items-center full-width">
        <q-card>
        <q-avatar>
           <q-img :src="'images/default_profile.png'"/>
        </q-avatar>
        </q-card>
       
      </q-page>
    </template>
  </MainLayout>
</template>

<script lang="ts" setup>
import MainLayout from '../../components/MainLayout.vue';
import { useAuthStore } from '../../stores/auth';
import { usePostStore } from '../../stores/post';

const { currentUser } = useAuthStore();
const { formData, whatAreYouThinking } = usePostStore();
</script>
