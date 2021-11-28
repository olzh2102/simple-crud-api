const { v4: uuidv4 } = require('uuid');
const fs = require('fs')

// const rawData = fs.readFileSync('./data.json')
// const persons = JSON.parse(rawData)
const persons = require('./data')

const findAll = () => new Promise((resolve, _) => resolve(persons))
const findById = (id, data) => new Promise((resolve, _) => 
    resolve(data.find((p) => p.id == id))
)
const remove = (id) => new Promise((resolve, reject) => {
    persons = persons.filter((p) => p.id !== id)
    resolve(persons)     
})
const create = (person) => new Promise((resolve, _) => {
    let newPerson = {
        id: uuidv4(),
        ...person
    }
    resolve(newPerson)
})

module.exports = {
    findAll,
    findById,
    remove,
    create
}