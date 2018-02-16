// @flow
const COLORS = {
  error: `
  color: #4a2713;
  background: #f51717;
  font-size: 12px;
  font-weight: 900;
  border-radius: 3px;
  padding: 1px;`,

  info: `
  color: #4a2713;
  background: #f59417;
  font-size: 12px;
  font-weight: 900;
  border-radius: 3px;
  padding: 1px;`,

  warn: `
  color: #fff;
  background: blu;
  font-size: 12px;
  font-weight: 900;
  border-radius: 3px;
  padding: 1px`,

  success: `
  color: #fff;
  background: #89bf04;
  font-size: 12px;
  font-weight: 900;
  border-radius: 3px;
  padding: 1px`
};

export default function (options = {}) {
  if (process.env.NODE_ENV !== 'production') {
    options = Object.assign({ timestamp: Date.now(), style: 'info' }, options);
    const message = `%c [${(options.tag || 'Unnamed')}]: ${(options.message || 'no message')}`;
    const styles = COLORS[options.style];
    const args = [message];
    const debug = options.debug;

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
};
