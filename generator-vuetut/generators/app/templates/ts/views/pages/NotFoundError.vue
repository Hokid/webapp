<template lang="pug">
  .not-found-error-page
    h1 Not Found 404
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: 'NotFoundErrorPage',
})
export default class NotFoundErrorPage extends Vue {

}
</script>

<style <% if (sassPresets) { %>lang="sass"<% } %>>
  <% if (sassPresets) { %>/*@import '~@/assets/sass/_env/import'*/<% } %>
</style>
