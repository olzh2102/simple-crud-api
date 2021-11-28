const { HTTP_METHODS } = require('./constants')
const { handleResponse } = require('./util')
const { 
    getPersons, 
    getPerson, 
    deletePerson, 
    updatePerson, 
    createPerson 
} = require('./controller')

function handleRequest(pathToDB) {
    return async (req, res) => {
        const { url, method } = req
        const response = handleResponse(res)

        if (
            method == HTTP_METHODS.GET && 
            url == '/api/person'
        ) getPersons(req, { res, response }, pathToDB)
        

        else if (
            method == HTTP_METHODS.GET && 
            url.split('/').length >= 3
        ) {
            const id = url.split('/')[3]
            getPerson(req, { res, response }, pathToDB)(id) 
        }

        else if (
            method == HTTP_METHODS.POST && 
            url == '/api/person'
        ) createPerson(req, { res, response }, pathToDB)

        else if (
            method == HTTP_METHODS.PUT && 
            url.split('/').length >= 3
        ) {
            const id = url.split('/')[3]
            updatePerson(req, { res, response }, pathToDB)(id)
        }

        else if (
            method == HTTP_METHODS.DELETE && 
            url.split('/').length >= 3
        ) {
            const id = url.split('/')[3]
            deletePerson(req, { res, response }, pathToDB)(id)
        }
        
        else response(404)({  message: 'Route not found' })
    }
}

module.exports = handleRequest
