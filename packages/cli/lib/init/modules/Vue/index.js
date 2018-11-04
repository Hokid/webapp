const TemplateExtractor = require('../../../TemplateExtractor');
const inquirer = require('inquirer');
const path = require('path');
const chalk = require('chalk');

class Vue extends TemplateExtractor {
  constructor(options) {
    super();
    this.cwd = options.cwd;
    this.root = path.resolve(__dirname, './')
    this.templates = path.resolve(this.root, 'template/')
    this.sass = false;
  }

  async run() {
    try {
      await inquirer.prompt({
        name: 'features',
        type: 'checkbox',
        message: 'Select features:',
        choices: [
          {name: 'Sass assets', value: 'sass'}
        ]
      }).then(answer => {
        this.sass = answer.features.includes('sass');
      });

      if (this.sass) {
        throw new Error();
        await this.extractTemplate(path.resolve(this.templates, 'sass'), '**/*', this.cwd);
      }
    } catch (e) {
      console.log(chalk.red('[vue plugin] error: '), '\n', e);
    }
  }
}

module.exports = Vue;
