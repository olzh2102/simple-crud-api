const persons = require('./data')

class PersonsController {
    // * getting all persons
    async getPersons() {
        return new Promise((resolve) => resolve(persons))
    }

    // * get persons
    async getPerson(id) {
        return new Promise((resolve, reject) => {
            let person = persons.find((p) => p.id == parseInt(id))

            if (person)
                resolve(person)
            else
                reject(`Person with id ${id} not found.`)
        })
    }

    // * create person
    async createPerson(person) {
        return new Promise((resolve, _) => {
            let newPerson = {
                id: Math.floor(5 + Math.random() * 10),
                ...person
            }
            resolve(newPerson)
        })
    }
}

module.exports = PersonsController