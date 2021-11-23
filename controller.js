const persons = require('./data')

class PersonsController {
    // * getting all persons
    async getPersons() {
        return new Promise((resolve) => resolve(persons))
    }

    // * get persons
    async getPersons(id) {
        return new Promise((resolve, reject) => {
            let person = persons.find((p) => p.id == parseInt(id))

            if (person)
                resolve(person)
            else
                reject(`Person with id ${id} not found.`)
        })
    }
}

module.exports = PersonsController