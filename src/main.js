import Vue from 'vue';
import { Tree } from 'element-ui';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(Tree);

new Vue({
  render: h => h(App),
}).$mount('#app');
