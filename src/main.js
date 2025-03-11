import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import 'bootstrap/dist/css/bootstrap.css'; // Default Bootstrap CSS
import 'bootstrap-rtl/dist/css/bootstrap-rtl.css'; // Bootstrap RTL CSS
import '@fortawesome/fontawesome-free/css/all.css';
import './assets/scss/global.scss';


const app = createApp(App);
// التحقق من تسجيل الدخول قبل إنشاء التطبيق
const isAuthenticated = localStorage.getItem('userName'); // تحقق من وجود اسم مستخدم في localStorage

if (!isAuthenticated && window.location.pathname !== '/login') {
  router.push('/login'); // إذا لم يكن المستخدم مسجلًا، توجيهه إلى صفحة الدخول
}

app.use(router);
app.use(Toast);
app.mount('#app');
