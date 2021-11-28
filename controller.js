const { validate: uuidValidate } = require('uuid');

const { 
    findAll, 
    findById, 
    create 
} = require('./model')
const { getReqData, writeInto, hasRequiredFields, isCorrectType } = require('./util')
const { REQUIRED_FIELDS, HTTP_STATUS } = require('./constants')

async function getPersons(req, { response }, pathToDB) {
    try {
        const data = await findAll(pathToDB)
        response(HTTP_STATUS.OK)(data.persons)
    } catch (error) {
        response(HTTP_STATUS.SERVER)({ message: error.message })
        console.error(error)
    }
}

function getPerson(req, { response }, pathToDB) {
    return async (id) => {
        if (!uuidValidate(id))
            response(HTTP_STATUS.BAD_REQ)({ message: 'Not valid id' })
    
        try {
            const person = await findById(id, pathToDB)

            !person 
                ? response(HTTP_STATUS.NOT_FOUND)({ message: `Person with id ${id} not found` })
                : response(HTTP_STATUS.OK)(person)
        } catch (error) {
            response(HTTP_STATUS.SERVER)({ message: error.message })
            console.error(error)
        }
    }
}

async function createPerson(req, { res, response }, pathToDB) {
    const hasFields = hasRequiredFields(REQUIRED_FIELDS)

    try {
        let personData = await getReqData(req)
        personData = await create(JSON.parse(personData))
        
        if (!hasFields(personData))
            response(HTTP_STATUS.BAD_REQ)({ message: 'Request body does not contain required fields' })
        
        const res = isCorrectType(personData)
        if (res.length > 0) {
            response(HTTP_STATUS.BAD_REQ)({ message: `TypeError: ${res.join(', ')}` })
        } else {

            let data = await findAll(pathToDB)
            data.persons.push(personData)
            data = { persons: data.persons }
    
            writeInto(pathToDB, data)
    
            response(HTTP_STATUS.CREATED)(personData)
        }
    } catch (error) {
        response(500)({ message: error.message })
        console.error(error)
    }
}

function updatePerson(req, { res, response }, pathToDB) {
    return async (id) => {
        if (!uuidValidate(id))
            response(HTTP_STATUS.BAD_REQ)({ message: 'Bad Request: not valid id provided' })
     
        try {
            let person = await findById(id, pathToDB)

            if (!person) 
                response(HTTP_STATUS.NOT_FOUND)({ message: `Person with id ${id} not found` })

            else {
                let body = await getReqData(req)
                body = JSON.parse(body)

                const updated = { ...person, ...body }
                let data = await findAll(pathToDB)
                data = data.persons.filter((p) => p.id != id)

                writeInto(pathToDB, { persons: data.concat(updated) })

                response(HTTP_STATUS.OK)(updated)
            }
        } catch (error) {
            response(HTTP_STATUS.SERVER)({ message: error.message })
            console.error(error)
        }
    }
}

function deletePerson(req, { res, response }, pathToDB) {
    return async (id) => {
        if (!uuidValidate(id))
            response(400)({ message: 'Bad Request: not valid id provided' })
            
        try {
            const data = await findAll(pathToDB)
            const person = await findById(id, pathToDB)

            if (!person)
                response(HTTP_STATUS.NOT_FOUND)({ message: `Person with id ${id} not found` })
            
            else {   
                const persons = data.persons.filter((p) => p.id != id)
                writeInto(pathToDB, { persons })
                response(HTTP_STATUS.SUCCESS_EMPTY)({ message: `Person with id ${id} is deleted` })
            }
        } catch (error) {        
            response(HTTP_STATUS.SERVER)({ message: error.message })
            console.error(error)
        }
    }
}

module.exports = {
    getPersons,
    getPerson,
    deletePerson,
    updatePerson,
    createPerson
}