import GEvents from '@hokid/webapp-service-global-events';
<% if (vuex) { %>import store from './store';<% } %>
<% if (vueRouter) { %>import router from './router';<% } %>

export {
  GEvents,
  <% if (vuex) { %>store,<% } %>
  <% if (vueRouter) { %>router,<% } %>
};
