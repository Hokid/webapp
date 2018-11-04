# Install

Include App.sass into your bundle:

```
// vue app
<style lang="sass" src="<dest>/App.sass"></style>
// or
import "<dest>/App.sass";
```

<% if (installModori) { %>
 * Modori `./vendors/modori`
<% } %>
<% if (installBulma) { %>
 * Bulma `./vendors/bulma/import`
<% } %>
<% if (installMdi) { %>
 * Mdi `App.scss`
<% } %>

