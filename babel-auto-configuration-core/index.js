const fs = require('fs');
const path = require('path');
const { exec  } = require('child_process');

const babelRcNames = ['.babelrc'];

class BabelConfiguration {
    constructor(options = {}) {
        this.path = options.path;
        this.babelrc = null;
        this.package = null;
        this.pluginCheckers = [];
        this.presetsCheckers = [];
        this.packageCheckers = [];
        this.packagesToInstall = [];
    }

    setPluginsChecker(checker) {
        this.pluginCheckers.push(checker);
    }

    setPackagesChecker(checker) {
        this.packageCheckers.push(checker);
    }

    installPackages() {
        const prod = this.packagesToInstall.filter(pkg => {
            return pkg.type === 'p';
        });

        const dev = this.packagesToInstall.filter(pkg => {
            return pkg.type === 'd';
        });

        const prodList = prod.map(p => p.name).join(' ');
        const devList = dev.map(p => p.name).join(' ');

        let cmd = '';

        if (prodList) {
            cmd += `npm install -S ${prodList}`;
        }

        if (devList) {
            cmd += `${cmd ? ' &&' : ''}npm install -D ${devList}`;
        }

        if (cmd) {
            exec(cmd, { cwd: this.path });
        }
    }

    setPresetsChecker(checker) {
        this.presetsCheckers.push(checker);
    }

    run() {
        this.resolvePackage();
        this.resolveBabelRc();
        this.babelrc.plugins = this.pluginCheckers.reduce((plugins, checker) => {
            return checker(plugins);
        }, this.babelrc.plugins);
        this.babelrc.presets = this.presetsCheckers.reduce((presets, checker) => {
            return checker(presets);
        }, this.babelrc.presets);
        this.packageCheckers.reduce((data, checker) => {
            checker(data);
        }, { package: this.package, packagesToInstall: this.packagesToInstall });
        this.installPackages();
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

    resolvePackage() {
        const pathToFile = path.resolve(this.path, 'package.json');
        if (fs.existsSync(pathToFile)) {
            this.package = JSON.parse(fs.readFileSync(pathToFile, { encoding: 'utf-8' }));
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
