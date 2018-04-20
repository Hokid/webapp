<template lang="pug">
  .error-page
    h1 Error has occurred
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: 'ErrorPage',
})
export default class ErrorPage extends Vue {

}
</script>

<style <% if (sassPresets) { %>lang="sass"<% } %>>
  <% if (sassPresets) { %>/*@import '~@/assets/sass/_env/import'*/<% } %>
</style>
