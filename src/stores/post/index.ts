import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { api } from '../../api';
import { Notify } from 'quasar';
import { router } from '../../router';
import { useAuthStore } from '../auth';

export const usePostStore = defineStore('postStore', () => {
  const formData = {
    post: {
      newPost: '',
    },
  };

  const whatAreYouThinking = computed(() => {
    const { currentUser } = useAuthStore();
    return `What are you thinking, ${currentUser.firstName}?`;
  });
  return {
    formData,
    whatAreYouThinking,
  };
});
