const persons = require('./data')

class PersonsController {
    // * getting all persons
    async getPersons() {
        return new Promise((resolve) => resolve(persons))
    }
}

module.exports = PersonsController