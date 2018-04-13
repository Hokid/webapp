# Usage

```js
import Vue from 'vue';
import Vufycations from '@hokid/webapp-service-vuefycations';
import EE from 'events';

Vue.use(Vufycations, {
  EventEmitter: EE,
  default: {
    duration: 4000,
    position: 'is-bottom-right',
    type: 'is-info'
  },
  events: [
    {
      name: 'event-a',
      toast: {
        message: 'Event A happens',
        type: 'is-info'
      }
    },
    {
      name: 'event-b',
      toast(event) {
        const message = event.message;

        return {
          message: 'Event B happens, message: ' + message,
          type: 'is-info'
        };
      }
    }
  ]
});
```

