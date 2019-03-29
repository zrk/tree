import Vue from 'vue';
import { Tree } from 'element-ui';
import lang from 'element-ui/lib/locale/lang/ru-RU';
import locale from 'element-ui/lib/locale';

import App from './App.vue';

locale.use(lang);

Vue.config.productionTip = false;

Vue.use(Tree);

new Vue({
  render: h => h(App),
}).$mount('#app');
