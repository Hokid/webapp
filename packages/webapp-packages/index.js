const path = require('path');
const fs = require('fs');

class WebappPackages {
  constructor(options) {
    this.path = options.path;
    this.package = null;
    this.resolvePackage();
  }

  has(name) {
    if (this.package && this.package.webapp) {
      return this.package.webapp.includes(name);
    }
    return false;
  }

  add(name) {
    if (this.package && !this.has(name)) {
      if (!this.package.webapp) {
        this.package.webapp = [];
      }
      this.package.webapp.push(name);
    }
  }

  delete(name) {
    if (this.package && this.package.webapp && this.has(name)) {
      if (this.package.webapp) {
        const index = this.package.webapp.indexOf(name);
        this.package.webapp.splice(index, 1);
      }
    }
  }

  update() {
    const pathToFile = path.resolve(this.path, 'package.json');
    fs.writeFileSync(pathToFile, JSON.stringify(this.package, null, 2), { encoding: 'utf-8' });
  }

  resolvePackage() {
    const pathToFile = path.resolve(this.path, 'package.json');
    if (fs.existsSync(pathToFile)) {
      this.package = JSON.parse(fs.readFileSync(pathToFile, { encoding: 'utf-8' }));
    }
  }
}

module.exports = WebappPackages;
