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
<% if (sassPresets) { %>
// Main styles
<style lang="sass" src="@/assets/sass/App.sass"></style>
<% } %>

