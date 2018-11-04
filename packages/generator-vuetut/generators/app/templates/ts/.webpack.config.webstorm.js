// special for webstorm
const path = require('path');

module.exports = {
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, './src')
        }
    },
}
