import _typeof from "@babel/runtime/helpers/typeof";
import "core-js/modules/es6.function.name";
import "core-js/modules/es6.object.assign";
var $Vue;
var EventEmitter;
var defaultSettings;
var events;

function initialize() {
  var _arguments = arguments;
  events.forEach(function (item) {
    var toast = Object.assign({}, defaultSettings, item.toast);
    EventEmitter.on(item.name, function () {
      if (typeof toast === 'function') {
        var options = toast(_arguments);

        if (options && options.message) {
          $Vue.$toast.open(options);
        }
      } else if (toast.message) {
        $Vue.$toast.open(toast);
      }
    });
  });
}

function throwOptionsError(tag, prefix) {
  throw new Error("".concat(tag, ": ").concat(prefix, " was not provided or has wrong format"));
}

function processOptions(options) {
  if (options.EventEmitter == null) throwOptionsError('[options.EventEmitter]', 'EventEmitter');
  if (_typeof(options.default) !== 'object') throwOptionsError('[options.default]', 'default settings for toast');
  if (!Array.isArray(options.events)) throwOptionsError('[options.events]', 'events for catch');
  EventEmitter = options.EventEmitter;
  defaultSettings = options.default;
  events = options.events;
}

export default function plugin(Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (plugin.installed) {
    return;
  }

  plugin.installed = true;
  processOptions(options);
  Vue.mixin({
    created: function created() {
      if (!plugin.inited) {
        $Vue = this.$root;
        initialize();
        plugin.inited = true;
      }
    }
  });
}
;