import "core-js/modules/es6.object.assign";
// @flow
var COLORS = {
  error: "\n  color: #4a2713;\n  background: #f51717;\n  font-size: 12px;\n  font-weight: 900;\n  border-radius: 3px;\n  padding: 1px;",
  info: "\n  color: #4a2713;\n  background: #f59417;\n  font-size: 12px;\n  font-weight: 900;\n  border-radius: 3px;\n  padding: 1px;",
  warn: "\n  color: #fff;\n  background: blu;\n  font-size: 12px;\n  font-weight: 900;\n  border-radius: 3px;\n  padding: 1px",
  success: "\n  color: #fff;\n  background: #89bf04;\n  font-size: 12px;\n  font-weight: 900;\n  border-radius: 3px;\n  padding: 1px"
};
export default function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (process.env.NODE_ENV !== 'production') {
    options = Object.assign({
      timestamp: Date.now(),
      style: 'info'
    }, options);
    var message = "%c [".concat(options.tag || 'Unnamed', "]: ").concat(options.message || 'no message');
    var styles = COLORS[options.style];
    var args = [message];
    var debug = options.debug;

    if (styles) {
      args.push(styles);
    }

    if (debug !== undefined) {
      args.push(debug);
    }

    console.info.apply(console, args);

    if (options.trace) {
      if ('trace' in console) {
        console.trace();
      } else {
        try {
          throw new Error();
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
}
;