const { v4: uuidv4 } = require('uuid');
const fs = require('fs')
const path =  require('path')

const { writeInto } = require('./util')

function findAll(filename) {
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

const findById = async (id, pathToDB) => {
    const data = await findAll(pathToDB)
    return new Promise((resolve, _) => 
        resolve(data.persons.find((p) => p.id == id))
    )
}

const remove = (id) => async (data) => {
    const updated = data.filter((p) => p.id !== id)
    await writeInto('./data.json', { persons: updated })
}

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