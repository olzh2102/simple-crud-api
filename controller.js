const { Buffer } = require('buffer')
const { writeFile, appendFile, readFileSync } =  require('fs')
const fs =  require('fs')
const path =  require('path')
const { pipeline, Transform } = require('stream')
const { v4: uuidv4, validate: uuidValidate } = require('uuid');

const { findAll, findById, remove, create } = require('./model')
const { getReqData } = require('./util')
const { REQUIRED_FIELDS } = require('./constants')
const persons = require('./data')

function getData(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(
            path.join(__dirname, filename), 
            'utf-8', 
            (err, data) =>  {
                if (err) reject(err)
                else resolve(JSON.parse(data))
            })
    })
}

function writeData(filename, data) {
    return new Promise((_, reject) => {
        fs.writeFile(
            path.join(__dirname, filename), 
            JSON.stringify(data), 
            'utf-8',
            (err) =>  {
                if (err) reject(err)
            }
        )
    })
}

async function getPersons(req, res) {
    try {
        // const persons = await findAll()
        const data = await getData('./data.json')
        console.log(data.persons)

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(data.persons))
    } catch (error) {
        // console.log(error)
        res.writeHead(500, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({ message: error.message }))
    }
}

function getPerson(req, res) {
    return async (id) => {

        if (!uuidValidate(id)) {
            res.writeHead(400, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({ message: 'Not valid id' }))
        }

        try {
            const data = await getData('./data.json')
            const person = await findById(id, data.persons)

            if (!person) {
                res.writeHead(404, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({ message: 'Person not found' }))
            } else {   
                res.writeHead(200, {'Content-Type': 'application/json'})
                res.end(JSON.stringify(person))
            }
        } catch (error) {
            console.log(error)
        }``
    }
}

function deletePerson(req, res) {
    return async (id) => {

        if (!uuidValidate(id)) {
            res.writeHead(400, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({ message: 'Not valid id' }))
        }

        try {
            let person = await findById(id)

            if (!person) {
                res.writeHead(404, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({ message: 'Person not found' }))
            } 
            
            else {   
                await remove(id)

                res.writeHead(204, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({ message: `Person with id ${id} is deleted` }))
            }
        } catch (error) {        
            console.log(error)
        }
    }
}

async function createPerson(req, res) {
    try {
        let personData = await getReqData(req)
        personData = JSON.parse(personData)

        if (!REQUIRED_FIELDS.every((f) => personData.hasOwnProperty(f))) {
            res.writeHead(400, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({ message: 'Request body does not contain required fields' })) 
        }

        let data = await getData('./data.json')
        const persons = data.persons

        personData = await create(personData)

        persons.push(personData)

        data = { persons }

        writeData('./data.json', data)
        
        res.writeHead(201, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(personData)) 
    } catch (error) {
        console.log(error)
    }
}

function updatePerson(req, res) {
    return async (id) => {

        if (!uuidValidate(id)) {
            res.writeHead(400, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({ message: 'Not valid id' }))
        }

        try {
            let person = await findById(id)

            if (!person) {
                res.writeHead(404, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({ message: 'Person not found' }))
            } 

            else {
                let body = await getReqData(req)
                body = JSON.parse(body)

                const updated = { ...person, ...body }

                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(updated)) 
            }
        } catch (error) {
            console.log(error)
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