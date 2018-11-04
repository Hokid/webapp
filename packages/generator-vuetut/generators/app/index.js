const Generator = require('yeoman-generator');
const path = require('path');
const utils = require('./utils');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.language = 'ts';
    this.projectName = null;
    this.vueCLI = '3.1.1';
    this.dockerFile = true;
    this.vuex = true;
    this.vueRouter = true;
    this.useSass = true;
    this.sassPresets = true;
    this.buefyPkg = true;
    this.vufycationsPkg = true;
    this.nodeServerPresets = true;
    this.vueLoadersPkg = true;
    this.lodash = true;
    this.moment = false;
    this.dependencies = [
      'vue-meta',
      '@hokid/webapp-service-global-events',
      '@hokid/webapp-service-utils'
    ];
    this.devDependencies = [
      'pug',
      'pug-plain-loader'
    ];
    this.pkgExtend = {
      // license: "ISC",
      private: true,
      author: "Kirill Horoshilov <mr.hokid@gmail.com>",
      "browserslist": [
        "last 2 versions",
        "not ie <= 10",
        "Safari > 9"
      ],
    };
    this.vueCreatePresets = {
      useConfigFiles: false,
      plugins: {
        "@vue/cli-plugin-babel": {},
        "@vue/cli-plugin-typescript": {
          "classComponent": true,
          "tsLint": true,
          "lintOn": [
            "save"
          ],
          "useTsWithBabel": true
        },
        "@vue/cli-plugin-pwa": {},
        "@vue/cli-plugin-unit-jest": {}
      },
      router: false,
      routerHistoryMode: false,
      vuex: false,
      cssPreprocessor: null
    }
  }

  async prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: 'my-vue-project'
      },
      {
        type: 'list',
        name: 'language',
        message: 'What language prefer?',
        choices: [{ name: 'Typescript', value: 'ts' }]
      },
      {
        type: 'checkbox',
        name: 'presets',
        message: 'What do you prefer?',
        choices: [
          { name: 'Vuex', value: 'vuex', checked: this.vuex },
          { name: 'Vue Router', value: 'vueRouter', checked: this.vueRouter },
          { name: 'Use SASS as pre-processor', value: 'useSass', checked: this.useSass },
          { name: 'Sass presets (installed via generator-sazy)', value: 'sass', checked: this.sassPresets },
          { name: 'Vuefycations (require buefy)', value: 'vufycationsPkg', checked: this.vufycationsPkg },
          { name: 'Lodash', value: 'lodash', checked: this.lodash },
          { name: 'Moment', value: 'moment', checked: this.moment },
          { name: 'Buefy', value: 'buefy', checked: this.buefyPkg },
          { name: 'Vue Loaders', value: 'vueLoaders', checked: this.vueLoadersPkg },
          { name: 'Node.js server (installed via generator-moser)', value: 'nodeServer', checked: this.nodeServerPresets },
          { name: 'Material Design Icons', value: 'installMdi', checked: this.installMdi },
          { name: 'Dockerfile', value: 'docker', checked: this.dockerFile }
        ]
      }
    ];

    const answers = await this.prompt(prompts);

    this.language = answers.language;
    this.projectName = answers.name;
    this.dockerFile = answers.presets.includes('docker');
    this.vuex = answers.presets.includes('vuex');
    this.vueRouter = answers.presets.includes('vueRouter');
    this.useSass = answers.presets.includes('useSass');
    this.sassPresets = answers.presets.includes('sass');
    this.buefyPkg = answers.presets.includes('buefy');
    this.vufycationsPkg = answers.presets.includes('vufycationsPkg');
    this.nodeServerPresets = answers.presets.includes('nodeServer');
    this.vueLoadersPkg = answers.presets.includes('vueLoaders');
    this.lodash = answers.presets.includes('lodash');
    this.moment = answers.presets.includes('moment');
    this.installMdi = answers.presets.includes('installMdi');
  }

  async configuring() {
    if (this.vueRouter) {
      this.vueCreatePresets.router = true;
      this.vueCreatePresets.routerHistoryMode = true;
    }

    if (this.buefyPkg) {
      this.dependencies.push('buefy', 'vue-switches');
    }

    if (this.useSass) {
      this.vueCreatePresets.cssPreprocessor = "sass";
    }

    if (this.vuex) {
      this.dependencies.push('vuex-persistedstate');
      this.dependencies.push('vuex-class');
      this.vueCreatePresets.vuex = true;
    }

    if (this.vufycationsPkg) {
      this.dependencies.push('@hokid/webapp-service-vufycations');
    }

    if (this.vueLoadersPkg) {
      this.dependencies.push('vue-loaders');
    }

    if (this.lodash) {
      this.dependencies.push('lodash', '@types/lodash');
    }

    if (this.moment) {
      this.dependencies.push('moment');
    }

    if (this.installMdi) {
      this.dependencies.push('@mdi/font');
    }

    utils.runSync(
      this.spawnCommandSync.bind(this),
      'npx',
      [
        `@vue/cli@${this.vueCLI}`,
        'create',
        '--inlinePreset',
        JSON.stringify(this.vueCreatePresets),
        this.projectName
      ]
    );

    this.destinationRoot(this.destinationPath(this.projectName));
  }

  writing() {
    const options = {
      dockerFile: this.dockerFile,
      vuex: this.vuex,
      vueRouter: this.vueRouter,
      sassPresets: this.sassPresets,
      buefyPkg: this.buefyPkg,
      vufycationsPkg: this.vufycationsPkg,
      nodeServerPresets: this.nodeServerPresets,
      vueLoadersPkg: this.vueLoadersPkg,
      lodash: this.lodash,
      moment: this.moment,
      installMdi: this.installMdi
    };


    this.fs.extendJSON(
      this.destinationPath('tsconfig.json'),
      {
        compilerOptions: {
          lib: [
            "es2015",
            "es2017",
            "dom",
            "dom.iterable",
            "scripthost"
          ],
        }
      }
    );

    this.fs.extendJSON(
      this.destinationPath('tslint.json'),
      {
        "rules": {
          "curly": [true, "ignore-same-line"],
          "quotemark": [true, "single"],
          "indent": [true, "spaces", 2],
          "interface-name": false,
          "ordered-imports": false,
          "object-literal-sort-keys": false,
          "no-consecutive-blank-lines": false,
          "no-console": false,
          "no-string-literal": false,
          "no-empty": false,
          "no-bitwise": false
        }
      }
    );

    if (this.dockerFile) {
      this.fs.extendJSON(
        this.destinationPath('package.json'),
        {
          scripts: {
            "docker-server": ""
          }
        }
      );
    }

    this.fs.extendJSON(
      this.destinationPath('package.json'),
      this.pkgExtend
    );

    const list = [
      this.destinationPath('src/App.vue'),
      this.destinationPath('src/main.ts'),
      this.destinationPath('src/shims.d.ts'),
      this.destinationPath('src/views/Home.vue'),
      this.destinationPath('src/views/About.vue'),
      this.destinationPath('src/components/')
    ];

    if (this.vueRouter) {
      list.push(this.destinationPath('src/router.ts'));
    }

    if (this.vuex) {
      list.push(this.destinationPath('src/store.ts'));
    }

    this.fs.delete(list);

    this.fs.copyTpl(
      this.templatePath(this.language + '/services/Models/**/*'),
      this.destinationPath('src/services/Models/'),
      options,
      { globOptions: { dot: true } }
    );

    this.fs.copyTpl(
      this.templatePath(this.language + '/services/utils.ts'),
      this.destinationPath('src/services/utils.ts'),
      options
    );

    this.fs.copyTpl(
      this.templatePath(this.language + '/views/components/**/*'),
      this.destinationPath('src/views/components/'),
      options,
      { globOptions: { dot: true } }
    );

    if (this.vuex) {
      this.fs.copyTpl(
        this.templatePath(this.language + '/store/**/*'),
        this.destinationPath('src/store/'),
        options
      );
    }

    if (this.vueRouter) {
      this.fs.copyTpl(
        this.templatePath(this.language + '/router/**/*'),
        this.destinationPath('src/router/'),
        options
      );
      this.fs.copyTpl(
        this.templatePath(this.language + '/views/pages/**/*'),
        this.destinationPath('src/views/pages/'),
        options
      );
      this.fs.copyTpl(
        this.templatePath(this.language + '/views/templates/**/*'),
        this.destinationPath('src/views/templates/'),
        options
      );
    }

    if (this.vufycationsPkg) {
      this.fs.copyTpl(
        this.templatePath(this.language + '/services/Vufycations/**/*'),
        this.destinationPath('src/services/Vufycations/'),
        options
      );
    }

    if (this.dockerFile) {
      this.fs.copyTpl(
        [
          this.templatePath(this.language + '/.dockerignore'),
          this.templatePath(this.language + '/Dockerfile'),
        ],
        this.destinationPath(),
        options
      );
    }

    this.fs.copyTpl(
      [
        this.templatePath(this.language + '/.editorconfig'),
        this.templatePath(this.language + '/.env'),
        this.templatePath(this.language + '/.env.local'),
        this.templatePath(this.language + '/.webpack.config.webstorm.js'),
        this.templatePath(this.language + '/vue.config.js'),
      ],
      this.destinationPath(),
      options
    );

    this.fs.copyTpl(
      [
        this.templatePath(this.language + '/App.vue'),
        this.templatePath(this.language + '/main.ts'),
        this.templatePath(this.language + '/services.ts'),
        this.templatePath(this.language + '/shims.d.ts')
      ],
      this.destinationPath('src/'),
      options
    );
  }

  install() {
    this.npmInstall(this.dependencies, { 'save': true });
    this.npmInstall(this.devDependencies, { 'save-dev': true });
  }
}
