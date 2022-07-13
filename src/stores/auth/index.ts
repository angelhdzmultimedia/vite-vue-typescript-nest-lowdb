import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '../../api';
import { Notify } from 'quasar';
import { router } from '../../router';
import { wait } from '../../helpers';

export const useAuthStore = defineStore('authStore', () => {
  const defaultUser = {
    isLoggedIn: false,
    firstName: null,
    displayName: null,
    email: null,
    password: null,
    roles: null,
    id: null,
  }
  const currentUser = ref({
    ...defaultUser
  });

  const redirectUrl = ref<string | null>(null);

  const roles = ['USER_ROLE', 'ADMIN_ROLE', 'EDITOR_ROLE'];

  const formData = ref({
    register: {
      firstName: 'Angel',
      displayName: 'angelhdz',
      email: 'angelhdz@gmail.com',
      password: '123456',
      isPasswordHidden: true,
    },
    login: {
      email: 'angelhdz@gmail.com',
      password: '123456',
      isPasswordHidden: true,
    },
  });

  function setRedirect(path: string | null): void {
    redirectUrl.value = path;
  }

  function removeRedirect(): void {
    redirectUrl.value = null;
  }

  const isLoggingIn = ref(false)

  async function login() {
    try {
      isLoggingIn.value = true
      await wait(500)

      const { data } = await api.post('/login', {
        email: formData.value.login.email,
        password: formData.value.login.password,
      });
      currentUser.value = {
        ...data,
        isLoggedIn: true,
      };

      isLoggingIn.value = false

      Notify.create(
        `Logged in successfully. Redirecting to ${redirectUrl.value ?? 'Dashboard'}...`
      );
      await router.push('/');
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
      Notify.create('Registered successfully. Redirecting to Login...');
      router.push('/');
    } catch (error: unknown) {
      Notify.create(error as string);
    }
  }

  async function logout() {
    currentUser.value = {
      ...defaultUser
    }

    await router.push('/login')
  }

  return {
    isLoggingIn,
    logout,
    removeRedirect,
    setRedirect,
    login,
    register,
    formData,
    currentUser,
    redirectUrl,
  };
});
