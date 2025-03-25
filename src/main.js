import { createApp } from 'vue';
import { createPinia } from "pinia";
import App from './App.vue';
import router from './router';
import Toast from 'vue-toastification';
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice"; // PrimeVue Confirmation Service
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css';
import 'vue-toastification/dist/index.css';
import 'bootstrap/dist/css/bootstrap.css'; // Default Bootstrap CSS
import 'bootstrap-rtl/dist/css/bootstrap-rtl.css'; // Bootstrap RTL CSS
import '@fortawesome/fontawesome-free/css/all.css';
import '@/assets/scss/global.scss';

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
      preset: Aura
  }
});

const pinia = createPinia();  // Enable Pinia

// Check login status before creating the app
const isAuthenticated = localStorage.getItem('userName'); // Check for username in localStorage

if (!isAuthenticated && window.location.pathname !== '/login') {
  router.push('/login'); // Redirect to login page if not authenticated
}

app.use(pinia); // Pinia
app.use(router);  // Vue Router
app.use(Toast); // Toastification
app.use(ToastService);  // PrimeVue Toast Service
app.use(ConfirmationService); // PrimeVue Confirmation Service
app.mount('#app');  // Mount the app
