const http = require('http')

const Persons = require('./controller')

const PORT = process.env.PORT || 5000

const server = http.createServer(
    async (req, res) => {
        if (req.url == '/api/persons' && req.method == 'GET') {
            const persons = await new Persons().getPersons()
            res.writeHead(
                200,
                {'Content-Type': 'application/json'}
            )
            res.end(JSON.stringify(persons))
        } else {
            res.writeHead(
                404,
                {'Content-Type': 'application/json'}
            )
            
            res.end(
                JSON.stringify({ message: 'Route not found' })
            )
        }
    }
)

server.listen(
    PORT,
    () => { console.log(`server is running on port: ${PORT}`) }
)