import Vue from 'vue';
import GEvents from '@hokid/webapp-service-global-events';
<% if (vuex) { %>import store from './store';<% } %>
<% if (vueRouter) { %>import router, { addMainPageRoute } from './router';<% } %>

// addMainPageRoute(/* User, */router);

Vue.use({
  install($Vue, options) {
    $Vue.prototype.$services = {
    	// inject services here
    };
  },
});

export {
  GEvents,
  <% if (vuex) { %>store,<% } %>
  <% if (vueRouter) { %>router,<% } %>
};
