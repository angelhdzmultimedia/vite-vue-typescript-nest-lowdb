import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '../../api';
import { Notify } from 'quasar';

export const useAuthStore = defineStore('authStore', () => {
  const currentUser = ref({
    isLoggedIn: false,
    firstName: null,
    displayName: null,
    email: null,
    password: null,
    roles: null,
    id: null,
  });

  const roles = ['USER_ROLE', 'ADMIN_ROLE', 'EDITOR_ROLE'];

  const formData = ref({
    register: {
      firstName: 'Angel',
      displayName: 'angelhdzmultimedia',
      email: 'angelhdzmultimedia@gmail.com',
      password: '123456',
      isPasswordHidden: true,
    },
    login: {
      email: '',
      password: '',
      isPasswordHidden: true,
    },
  });

  async function login() {
    try {
      const { data } = await api.post('/login');
    } catch (error: unknown) {
      Notify.create(error);
    }
  }

  async function register() {
    try {
      const { data } = await api.post('/register');
    } catch (error: unknown) {
      Notify.create(error);
    }
  }

  return {
    login,
    register,
    formData,
    currentUser,
  };
});
