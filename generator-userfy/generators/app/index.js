const Generator = require('yeoman-generator');
const path = require('path');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.destination = 'src/';
  }
  async prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'dest',
        message: 'Enter destination to extract template',
        default: this.destination
      }
    ];

    const answers = await this.prompt(prompts);

    this.destination = this.destinationPath(answers.dest);
  }

  writing() {
    this.fs.copy(
      this.templatePath('**/*'),
      this.destination
    );
  }

  install() {
    this.destinationRoot(this.destination);
    this.npmInstall();
  }
}
