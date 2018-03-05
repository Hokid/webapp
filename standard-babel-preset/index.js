const path = require('path')

module.exports = (context, options = {}) => {
  const presets = []
  const plugins = []

  const envOptions = {
    modules: options.modules || false,
    targets: options.targets,
    useBuiltIns: typeof options.useBuiltIns === 'undefined' ? 'usage' : options.useBuiltIns
  }

  // pass options along to babel-preset-env
  presets.push([require('@babel/preset-env'), envOptions])

  // stage 2. This includes some important transforms, e.g. dynamic import
  // and rest object spread.
  presets.push([require('@babel/preset-stage-2'), {
    useBuiltIns: true
  }])

  // transform runtime, but only for helpers
  plugins.push([require('@babel/plugin-transform-runtime'), {
    polyfill: false,
    regenerator: false,
    moduleName: '@babel/runtime'
  }])

  return {
    presets,
    plugins
  }
}
