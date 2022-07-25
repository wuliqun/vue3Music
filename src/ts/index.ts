import { createApp } from "vue";
import router from '../router';

import App from '../pages/app.vue';
import '../style/common.scss';


createApp(App).use(router).mount('#app');