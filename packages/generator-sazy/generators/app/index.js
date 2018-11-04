const Generator = require('yeoman-generator');
const path = require('path');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.installBulma = true;
    this.installModori = true;
    this.installMdi = true;
    this.buefyPresets = true;
    this.vueLoadersPresets = true;
    this.destination = 'src/assets/sass/';
    this.root = null;
  }

  async prompting() {
    const prompts = [
      {
        type: 'checkbox',
        name: 'feats',
        message: 'Which additional features would you like to include?',
        choices: [
          { name: 'Bulma', value: 'installBulma', checked: this.installBulma },
          { name: 'Modori', value: 'installModori', checked: this.installModori },
          { name: 'Buefy presets (you should install lib manually)', value: 'buefy', checked: this.buefyPresets },
          { name: 'VueLoaders presets (you should install lib manually)', value: 'vueLoaders', checked: this.vueLoadersPresets }
        ]
      },
      {
        type: 'input',
        name: 'dest',
        message: 'Enter sass directory to extract template',
        default: this.destination
      }
    ];

    const answers = await this.prompt(prompts);

    this.installBulma = answers.feats.includes('installBulma');
    this.installModori = answers.feats.includes('installModori');
    this.root = this.destinationPath();
    this.destination = this.destinationPath(answers.dest);
  }

  configuring() {
    this.destinationRoot(this.destination);
  }

  writing() {
    const options = {
      installBulma: this.installBulma,
      installModori: this.installModori,
      installMdi: this.installMdi,
      buefyPresets: this.buefyPresets,
      vueLoadersPresets: this.vueLoadersPresets
    };

    // _env
    this.fs.copyTpl(
      this.templatePath('_env/**/*'),
     this.destinationPath('_env/'),
      options
    );
    // base
    this.fs.copyTpl(
      this.templatePath('base/**/*'),
     this.destinationPath('base/'),
      options
    );
    // components
    this.fs.copyTpl(
      this.templatePath('components/**/*'),
     this.destinationPath('components/'),
      options
    );
    // layout
    this.fs.copyTpl(
      this.templatePath('layout/**/*'),
     this.destinationPath('layout/'),
      options
    );
    // utils
    this.fs.copyTpl(
      this.templatePath('utils/**/*'),
     this.destinationPath('utils/'),
      options
    );
    // bulma
    if (this.installBulma) {
      this.fs.copyTpl(
        this.templatePath('vendors/bulma/**/*'),
       this.destinationPath('vendors/bulma/'),
        options
      );
    }
    // modori
    if (this.installModori) {
      this.fs.copyTpl(
        this.templatePath('vendors/modori.sass'),
       this.destinationPath('vendors/modori.sass'),
        options
      );
    }
    // readme
    this.fs.copyTpl(
      this.templatePath('README.md'),
     this.destinationPath('README.md'),
      options
    );
    // main
    this.fs.copyTpl(
      this.templatePath('App.sass'),
     this.destinationPath('App.sass'),
      options
    );
  }

  install() {
    this.destinationRoot(this.root);

    const deps = [];

    if (this.installBulma) {
      deps.push('bulma');
    }

    if (this.installModori) {
      deps.push('modori');
    }

    if (deps.length) {
      this.npmInstall(deps, { 'save': true });
    }
  }
}
