// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueLodash from 'vue-lodash';
import VueLogger from 'vuejs-logger';
import VueI18n from 'vue-i18n';
import router from './router';
import store from '@store/index';
import messages from "@/translation/index";
const isProduction = process.env.NODE_ENV === 'production';
Vue.config.productionTip = false

const options = {
    isEnabled: true,
    logLevel : isProduction ? 'error' : 'debug',
    stringifyArguments : false,
    showLogLevel : true,
    showMethodName : true,
    separator: '|',
    showConsoleColors: true
};

Vue.use(VueLogger, options);
Vue.use(VueI18n);
Vue.use(VueLodash);

const i18n = new VueI18n({
  locale: 'en',
  messages
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  i18n,
  template: '<App/>'
})
