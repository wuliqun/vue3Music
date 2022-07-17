import { createApp } from "vue";
import router from '../router';

import App from '../pages/app.vue';


createApp(App).use(router).mount('#app');