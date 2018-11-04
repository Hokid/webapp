<template lang="pug">
  #app.is-fullheight
    transition(
      name="fade"
      mode="out-in"
    )
    router-view
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: 'AppRoot',
  // VueMeta
  metaInfo: {
    title: 'AppRootTitle',
    htmlAttrs: {
      lang: 'en',
    },
  }
})
export default class AppRoot extends Vue {

}
</script>
<% if (installMdi) { %><style src="@mdi/font/css/materialdesignicons.css"></style><% } %>
// Main styles
<% if (buefyPkg) { %><style src="buefy/dist/buefy.css"></style><% } %>
<% if (vueLoadersPkg) { %><style src="vue-loaders/dist/vue-loaders.css"></style><% } %>
<% if (sassPresets) { %><style lang="sass" src="@/assets/sass/App.sass"></style><% } %>

