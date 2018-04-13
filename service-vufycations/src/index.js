let $Vue;
let EventEmitter;
let defaultSettings;
let events;

function initialize () {
  events.forEach((item) => {
    EventEmitter.on(item.name, () => {
      let options;
	
      if (typeof item.toast === 'function') {
        options = item.toast(arguments);
      } else {
	options = item.toast;        
      }

      options = Object.assign({}, defaultSettings, options);
      
      if (options && options.message) {
        $Vue.$toast.open(options)
      }
    });
  });
}

function throwOptionsError(tag, prefix) {
  throw new Error(`${tag}: ${prefix} was not provided or has wrong format`);
}

function processOptions(options) {
  if (options.EventEmitter == null) throwOptionsError('[options.EventEmitter]', 'EventEmitter');
  if (typeof options.default !== 'object') throwOptionsError('[options.default]', 'default settings for toast');
  if (!Array.isArray(options.events)) throwOptionsError('[options.events]', 'events for catch');

  EventEmitter = options.EventEmitter;
  defaultSettings = options.default;
  events = options.events;
}

export default function plugin (Vue, options = {}) {
  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  processOptions(options);

  Vue.mixin({
    created () {
      if (!plugin.inited) {
        $Vue = this.$root;
        initialize();
        plugin.inited = true;
      }
    }
  });
};
