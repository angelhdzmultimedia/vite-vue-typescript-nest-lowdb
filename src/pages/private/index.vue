<template>
  <MainLayout>
    <template #page>
      <q-page class="column items-center full-width">
        <q-card class="column q-mt-md items-center q-pa-md q-gutter-md">
          <q-card-section>
            <span class="text-h6 text-bold">Create Post</span>
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <q-img :src="'images/default_profile.png'" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{currentUser.firstName}}</q-item-label>
                <q-item-label caption>{{currentUser.displayName}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-separator dark />

          <q-editor
            v-model="formData.post.newPost"
            :placeholder="whatAreYouThinking"
          >
          </q-editor>

          <q-card-actions class="full-width">
            <q-btn class="full-width">POST</q-btn>
          </q-card-actions>
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
