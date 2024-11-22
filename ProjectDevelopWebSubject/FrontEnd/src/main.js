import { createApp } from 'vue';
import router from './router';

// Vuetify
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import store from './store';

// Components
import App from './App.vue';
// import './style.css';

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .use(store)
  .use(vuetify)
  .use(router)
  .mount('#app');
