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

  // transform runtime, but only for helpers
  plugins.push([require('@babel/plugin-transform-runtime'), {
    regenerator: false
  }])

  return {
    presets,
    plugins
  }
}
