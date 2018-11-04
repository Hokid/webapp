<template lang="pug">
  .l-root.is-footer-sticky.template-inner-page-default
    header.l-header
      //Header
    main.l-content
      transition(
      name="fade"
      mode="out-in"
      )
        keep-alive
          router-view
    footer.l-footer
      //Footer
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: 'InnerPagesDefaultTemplate',
  components: {
    // Header,
    // Footer,
  }
})
export default class InnerPagesDefaultTemplate extends Vue {

}
</script>

<style <% if (sassPresets) { %>lang="sass"<% } %>>
  <% if (sassPresets) { %>/*@import '~@/assets/sass/_env/import'*/<% } %>
</style>
