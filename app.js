const http = require('http')
const { pipeline } = require('stream')

const Persons = require('./controller')
const { getReqData } = require('./util')

const PORT = process.env.PORT || 5000
const server = http.createServer()

server.on('request', async (req, res) => {
        const { url, method } = req
        const isEq = isMatch(url, method)
        
        // * /api/persons : GET
        if (isEq('/api/persons', 'GET')) {
            const persons = await new Persons().getPersons()

            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(persons))
        } 

        // * /api/persons/:id : GET
        else if (isEq('', 'GET', () => url.match(/\/api\/persons\/([0-9]+)/))) {
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

        // * /api/persons/:id : UPDATE
        else if (isEq('', 'PUT', () => url.match(/\/api\/persons\/([0-9]+)/))) {
            try {
                const id = req.url.split("/")[3]
                const personData = await getReqData(req)
                let updated_person = await new Persons().updatePerson(id, personData);

                res.writeHead(200, { "Content-Type": "application/json" });d 
                res.end(JSON.stringify(updated_person));
            } catch (error) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: error }));
            }
        }

        // * /api/persons/:id : DELETE
        else if (isEq('', 'DELETE', () => url.match(/\/api\/persons\/([0-9]+)/))) {
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
        else if (isEq('/api/persons', 'POST')) {
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

function isMatch(url, method) {
    return (exactUrl = '', exactMethod, cb = () => false) => (exactUrl == url || cb()) && exactMethod == method 
}