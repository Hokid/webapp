const fs = require('fs');
const path = require('path');
const { exec  } = require('child_process');

class PackageConfiguration {
    constructor(options = {}) {
        this.path = options.path;
        this.package = null;
        this.packageCheckers = [];
        this.packagesToInstall = [];
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
            console.log('installing packages...');
            exec(cmd, { cwd: this.path });
        }
    }


    run() {
        this.resolvePackage();
        this.packageCheckers.reduce((data, checker) => {
            checker(data);
        }, { package: this.package, packagesToInstall: this.packagesToInstall });
        this.installPackages();
    }

    resolvePackage() {
        const pathToFile = path.resolve(this.path, 'package.json');
        if (fs.existsSync(pathToFile)) {
            this.package = JSON.parse(fs.readFileSync(pathToFile, { encoding: 'utf-8' }));
        }
    }
}

module.exports = {
    PackageConfiguration
}
