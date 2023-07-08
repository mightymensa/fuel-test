import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import StoragePlugin from './views/services/storage.plugin';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import '../public/assets/css/main.css';

/* import specific icons */
import {
  faUserSecret,
  faMoneyBill,
  faGasPump,
  faTachometerAlt,
  faFillDrip,
  faCogs,
} from '@fortawesome/free-solid-svg-icons';
library.add(faUserSecret, faMoneyBill, faGasPump, faTachometerAlt, faFillDrip, faCogs);

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';
import { StatusBar, Style } from '@capacitor/status-bar';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

const app = createApp(App).use(IonicVue).use(StoragePlugin).use(router).component('font-awesome-icon', FontAwesomeIcon);

router.isReady().then(async () => {
  try {
    await StatusBar.hide();
  } catch (error) {
    console.log(error);
  }
  app.mount('#app');
});
