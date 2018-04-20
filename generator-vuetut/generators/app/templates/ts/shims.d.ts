declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'vue-meta';
<% if (buefyPkg) { %>declare module 'buefy';<% } %>
<% if (vueLoadersPkg) { %>declare module 'vue-loaders';<% } %>
<% if (vuex) { %>declare module 'vuex-persistedstate';<% } %>

