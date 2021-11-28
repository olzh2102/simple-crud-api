const { 
    getPersons, 
    getPerson, 
    deletePerson, 
    updatePerson, 
    createPerson 
} = require('./controller')
const { HTTP_METHODS, REGEX } = require('./constants')
const { routeNotFound } = require('./util')

async function handleRequest(req, res) {
    const { url, method } = req

    if (
        method == HTTP_METHODS.GET && 
        url == '/api/person'
    ) getPersons(req, res)
    

    else if (
        method == HTTP_METHODS.GET && 
        url.match(REGEX)
    ) {
        const id = url.split('/')[3]
        console.log(id)
        getPerson(req, res)(id) 
    }

    else if (
        method == HTTP_METHODS.DELETE && 
        url.match(REGEX)
    ) deletePerson(req, res)(id)
    

    else if (
        method == HTTP_METHODS.PUT && 
        url.match(REGEX)
    ) {
        const id = url.split('/')[3]
        updatePerson(req, res)(id)
    }

    else if (
        method == HTTP_METHODS.POST && 
        url == '/api/person'
    ) createPerson(req, res)

    else routeNotFound(res)
}

module.exports = handleRequest
