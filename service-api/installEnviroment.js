const appPath = require('@hokid/app-path');
const babelCfg = require('@hokid/babel-auto-configuration-core').BabelConfiguration;
const packageCfg = require('@hokid/package-auto-configuration-core').PackageConfiguration;

const babelConfig = new babelCfg({
    path: appPath.get()
});

const pakageConfig = new packageCfg({
    path: appPath.get()
});

babelConfig.setPresetsChecker(presets => {
    if (!presets) {
        presets = [];
    }

    if (presets.indexOf('flow') === -1) {
        presets.push('flow');
    }

    if (presets.indexOf('stage-2') === -1) {
        presets.push('stage-2');
    }

    const foundEnv = presets.find(p => Array.isArray(p) && p[0] === 'env');

    if (!foundEnv) {
        presets.push(['env', {
            modules: false,
            targets: {
                browsers: ["> 1%", "last 2 versions", "not ie <= 8"]
            }
        }]);
    }

    return presets;
});

babelConfig.setPluginsChecker(plugins => {
    if (!plugins) {
        plugins = [];
    }

    if (plugins.indexOf('transform-class-properties') === -1) {
        const decoratorsPlugin = plugins.findIndex(p => p === 'transform-decorators-legacy');
        if (decoratorsPlugin === -1) {
            plugins.push('transform-class-properties');
        } else {
            plugins.splice(decoratorsPlugin + 1, 0, 'transform-class-properties');
        }
    }

    return plugins;
});

const devPlugins = [
    'babel-core',
    'babel-preset-flow',
    'babel-preset-env',
    'babel-preset-stage-2',
    'babel-plugin-transform-class-properties'
];


const prodPlugins = [
    'axios',
    '@hokid/webapp-service-utils',
    'lodash',
    '@hokid/webapp-service-global-events'
];

pakageConfig.setPackagesChecker(args => {
    const devDep = args.devDependencies;
    const prodDep = args.dependencies;
    const namesDev = !!devDep ? Object.keys(devDep) : [];
    const namesProd = !!prodDep ? Object.keys(prodDep) : [];
    const hasDev = !!namesDev.length;
    const hasProd= !!namesProd.length;

    devPlugins.forEach(name => {
        if (!hasDev || namesDev.indexOf(name) === -1) {
            args.packagesToInstall.push({ name: name, type: 'd' })
        }
    });

    prodPlugins.forEach(name => {
        if (!hasProd || namesProd.indexOf(name) === -1) {
            args.packagesToInstall.push({ name: name, type: 'p' })
        }
    });
});

babelConfig.run();
pakageConfig.run();
