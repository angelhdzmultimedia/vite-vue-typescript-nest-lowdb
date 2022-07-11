import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { Quasar, Notify } from 'quasar';
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css';
import 'quasar/src/css/index.sass';
import { router } from './router';
import { createPinia } from 'pinia';

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(router)
  .use(Quasar, {
    plugins: {
      Notify,
    },
  })
  .mount('#app');
