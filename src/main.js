import { createApp } from 'vue';
import App from './components/App.vue';

import './assets/index.css'
import PrimeVue from 'primevue/config';

import 'primeicons/primeicons.css';
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/saga-blue/theme.css';

const app = createApp(App);

app.use(PrimeVue);

app.mount('#app');
