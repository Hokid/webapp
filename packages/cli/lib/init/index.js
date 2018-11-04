const path = require('path');
const chalk = require('chalk');
const debug = require('debug');
const Vue = require('./modules/Vue');

const FRAMEWORKS = ['vue'];

class CommandHandler {
  constructor (commander) {
    this.cwd = process.cwd();
    this.framework = null;

    commander
      .command('init')
      .option('-d, --cwd <path>', 'working directory', (cwd) => path.resolve(this.cwd, cwd))
      .option('-f, --framework <name>', 'specify framework', (name) => FRAMEWORKS.includes(name) ? name : null)
      .action((options) => {
        if (options.cwd) {
          this.cwd = options.cwd;
        }

        if (options.framework) {
          this.framework = options.framework;
        }

        this.run();
      });
  }

  run() {
    if (this.framework === 'vue') {
      const vue = new Vue({
        cwd: this.cwd
      });

      vue.run();
    }
  }
}

module.exports = CommandHandler;
