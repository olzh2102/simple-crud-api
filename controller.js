const persons = require('./data')

class PersonsController {
    // * getting all persons
    getPersons() {
        return new Promise((resolve) => resolve(persons))
    }

    // * get persons
    getPerson(id) {
        return new Promise((resolve, reject) => {
            let person = persons.find((p) => p.id == parseInt(id))

            if (person)
                resolve(person)
            else
                reject(`Person with id ${id} not found.`)
        })
    }

    // * create person
    createPerson(person) {
        return new Promise((resolve, _) => {
            let newPerson = {
                id: Math.floor(5 + Math.random() * 10),
                ...person
            }
            resolve(newPerson)
        })
    }

    // * delete person
    deletePerson(id) {
        return new Promise((resolve, reject) => {
            console.log('dadas', id)
            let person = persons.find((person) => person.id == parseInt(id))
            
            if (!person)
                reject(`No person with id ${id} found`)

            resolve('Person deleted successfully')
        })
    }
}

module.exports = PersonsController