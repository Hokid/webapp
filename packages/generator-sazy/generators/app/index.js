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
    this.destination = 'assets/sass/';
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
        default: 'assets/sass/'
      }
    ];

    const answers = await this.prompt(prompts);

    this.installBulma = answers.feats.includes('installBulma');
    this.installModori = answers.feats.includes('installModori');
    this.buefyPresets = answers.feats.includes('buefy');
    this.vueLoadersPresets = answers.feats.includes('vueLoaders');
    this.destination = this.destinationPath(answers.dest);
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
      this.destination + '_env/',
      options
    );
    // base
    this.fs.copyTpl(
      this.templatePath('base/**/*'),
      this.destination + 'base/',
      options
    );
    // components
    this.fs.copyTpl(
      this.templatePath('components/**/*'),
      this.destination + 'components/',
      options
    );
    // layout
    this.fs.copyTpl(
      this.templatePath('layout/**/*'),
      this.destination + 'layout/',
      options
    );
    // utils
    this.fs.copyTpl(
      this.templatePath('utils/**/*'),
      this.destination + 'utils/',
      options
    );
    // bulma
    if (this.installBulma) {
      this.fs.copyTpl(
        this.templatePath('vendors/bulma/**/*'),
        this.destination + 'vendors/bulma/',
        options
      );
    }
    // modori
    if (this.installModori) {
      this.fs.copyTpl(
        this.templatePath('vendors/modori.sass'),
        this.destination + 'vendors/modori.sass',
        options
      );
    }
    // readme
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destination + 'README.md',
      options
    );
    // main
    this.fs.copyTpl(
      this.templatePath('App.sass'),
      this.destination + 'App.sass',
      options
    );
  }

  install() {
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
