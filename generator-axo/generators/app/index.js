const Generator = require('yeoman-generator');
const path = require('path');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.language = 'ts';
    this.destination = 'services/Api/';
    this.moduleAuth = true;
  }
  async prompting() {
    const prompts = [
      {
        type: 'list',
        name: 'language',
        message: 'What language prefer?',
        choices: [{ name: 'Typescript', value: 'ts' }]
      },
      {
        type: 'checkbox',
        name: 'modules',
        message: 'Which modules to include?',
        choices: [
          { name: 'Auth', value: 'auth', checked: this.moduleAuth }
        ]
      },
      {
        type: 'input',
        name: 'dest',
        message: 'Enter destination to extract template',
        default: this.destination
      }
    ];

    const answers = await this.prompt(prompts);

    this.language = answers.language;
    this.destination = this.destinationPath(answers.dest);
    this.moduleAuth = answers.modules.includes('auth');
  }

  writing() {
    // models
    this.fs.copy(
      this.templatePath(this.language + '/models/**/*'),
      this.destination + '/models/'
    );
    // base
    this.fs.copy(
      this.templatePath(this.language + '/modules/_base.ts'),
      this.destination + '/modules/_base.ts'
    );
    this.fs.copy(
      [
        this.templatePath(this.language + '/utils.ts'),
        this.templatePath(this.language + '/Base.ts')
      ],
      this.destination
    );
    // auth
    if (this.moduleAuth) {
      this.fs.copy(
      this.templatePath(this.language + '/modules/_auth.ts'),
      this.destination + '/modules/_auth.ts'
    );
    this.fs.copy(
      this.templatePath(this.language + '/Auth.ts'),
      this.destination + 'Auth.ts'
    );
    }
  }

  install() {
    this.npmInstall(['axios'], { 'save': true });
  }
}
