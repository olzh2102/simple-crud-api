require('dotenv').config()

const http = require('http')
const router = require('./route')


function main(db, port) {
    const server = http.createServer()
    
    server
        .on('request', router(db))
        .listen(port, () => console.log(`server is running on port: ${port}`))

    return server
}

const app = main('./data.json', process.env.PORT || 1234)

module.exports = {
    app,
    main
}