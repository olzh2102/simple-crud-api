require('dotenv').config()

const http = require('http')

const router = require('./route')
const { listenOn } = require('./util')

const PORT = process.env.PORT || 1234
const server = http.createServer()

server
    .on('request', router)
    .listen(PORT, listenOn(PORT))

module.exports = server