const fs = require('fs');
const path = require('path');
const { exec  } = require('child_process');

const babelRcNames = ['.babelrc'];

class BabelConfiguration {
    constructor(options = {}) {
        this.path = options.path;
        this.babelrc = null;
        this.pluginCheckers = [];
        this.presetsCheckers = [];
    }

    setPluginsChecker(checker) {
        this.pluginCheckers.push(checker);
    }

    setPresetsChecker(checker) {
        this.presetsCheckers.push(checker);
    }

    run() {
        this.resolveBabelRc();
        this.babelrc.plugins = this.pluginCheckers.reduce((plugins, checker) => {
            return checker(plugins);
        }, this.babelrc.plugins);
        this.babelrc.presets = this.presetsCheckers.reduce((presets, checker) => {
            return checker(presets);
        }, this.babelrc.presets);
        this.writeConfig();
    }

    resolveBabelRc() {
        const found = babelRcNames.some(name => {
            const pathToFile = path.resolve(this.path, name);
            if (fs.existsSync(pathToFile)) {
                this.babelrc = JSON.parse(fs.readFileSync(pathToFile, { encoding: 'utf-8' }));
                return true;
            }

            return false;
        });

        if (!found) {
            this.babelrc = {};
        }
    }

    writeConfig() {
        let file = babelRcNames.find(name => {
            const pathToFile = path.resolve(this.path, name);
            if (fs.existsSync(pathToFile)) {
                return true;
            }

            return false;
        });

        if (!file) {
            file = babelRcNames[0];
        }

        const pathToFile = path.resolve(this.path, file);

        fs.writeFileSync(pathToFile, JSON.stringify(this.babelrc, null, 2), { encoding: 'utf-8' });
    }
}

module.exports = {
    BabelConfiguration
}
