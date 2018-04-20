import Vue from 'vue';
import VueMeta from 'vue-meta';
<% if (buefyPkg) { %>import Buefy from 'buefy';<% } %>
<% if (vufycationsPkg) { %>
import Vufycations from "@hokid/webapp-service-vufycations";
import VufycationsConfig from "@/services/Vufycations";
<% } %>

import App from './App.vue';
import {
  <% if (vuex) { %>store,<% } %>
  <% if (vueRouter) { %>router,<% } %>
} from './services';
import './registerServiceWorker';
import {router, store} from "./services";

Vue.config.productionTip = false;

Vue.use(VueMeta);
<% if (buefyPkg) { %>Vue.use(Buefy);<% } %>
<% if (vufycationsPkg) { %>Vue.use(Vufycations, VufycationsConfig);<% } %>

new Vue({
  <% if (vuex) { %>store,<% } %>
  <% if (vueRouter) { %>router,<% } %>
  render: (h) => h(App),
}).$mount('#app');
