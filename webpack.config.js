const path = require('path')
const NODE_ENV = process.env.NODE_ENV || 'production';

module.exports = {
    entry: './app.js',
    mode: NODE_ENV,
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.js']
    }
}