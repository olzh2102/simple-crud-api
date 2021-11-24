const http = require('http')

const Persons = require('./controller')
const { getReqData } = require('./util')

const PORT = process.env.PORT || 5000

const server = http.createServer(
    async (req, res) => {
        // * /api/persons : GET
        if (
            req.url === '/api/persons' && 
            req.method == 'GET'
        ) {
            const persons = await new Persons().getPersons()

            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(persons))
        } 

        // * /api/persons/:id : GET
        else if (
            req.url.match(/\/api\/persons\/([0-9]+)/) &&
            req.method == 'GET'
        ) {
            try {
                const id = req.url.split('/')[3]
                const person = await new Persons().getPerson(id)

                res.writeHead(200, {'Content-Type': 'application/json'})
                res.end(JSON.stringify(person))
            } catch (error) {
                res.writeHead(404, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({ message: error }))
            }
        }

        // * /api/persons/:id : DELETE
        else if (
            req.url.match(/\/api\/persons\/([0-9]+)/) && 
            req.method === 'DELETE'
        ) {
            try {
                const id = req.url.split('/')[3]
                let message = await new Persons().deletePerson(id)
                
                res.writeHead(200, { "Content-Type": "application/json" })
                res.end(JSON.stringify({ message }))
            } catch (error) {        
                res.writeHead(404, { "Content-Type": "application/json" })            
                res.end(JSON.stringify({ message: error }))
            }
        }
      
        // * /api/persons/ : POST
        else if (
            req.url == '/api/persons' &&
            req.method == 'POST'
        ) {
            const personData = await getReqData(req)
            const person = await new Persons().createPerson(JSON.parse(personData))

            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(person))
        }

        // * Route does not exist
        else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Route not found" }));
        }
    }
)

server.listen(
    PORT,
    () => { console.log(`server is running on port: ${PORT}`) }
)