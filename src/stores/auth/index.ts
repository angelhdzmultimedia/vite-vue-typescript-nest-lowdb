import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '../../api';
import { Notify } from 'quasar';
import { router } from '../../router';

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
      email: 'angelhdzmultimedia@gmail.com',
      password: '123456',
      isPasswordHidden: true,
    },
  });

  async function login() {
    try {
      const { data } = await api.post('/login', {
        email: formData.value.login.email,
        password: formData.value.login.password,
      });
      currentUser.value = {
        ...data,
        isLoggedIn: true,
      };
      Notify.create('Logged in successfully. Redirecting...');
      router.push('/');
    } catch (error: unknown) {
      Notify.create(error as string);
    }
  }

  async function register() {
    try {
      const { data } = await api.post('/register', {
        firstName: formData.value.register.firstName,
        displayName: formData.value.register.displayName,
        email: formData.value.register.email,
        password: formData.value.register.password,
      });
      Notify.create('Registered successfully. Redirecting...');
      router.push('/');
    } catch (error: unknown) {
      Notify.create(error as string);
    }
  }

  return {
    login,
    register,
    formData,
    currentUser,
  };
});
