const HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
}

const HTTP_STATUS = {
    NOT_FOUND: 404,
    BAD_REQ: 400,
    OK: 200,
    CREATED: 201,
    SERVER: 500
}

const ENDPOINT = {
    ALL: 'api/person',
    ONE: 'api/person/',
}

const REGEX = /\/api\/person\/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/

const REQUIRED_FIELDS = ['hobbies', 'name', 'age']

module.exports = {
    HTTP_METHODS, 
    REGEX,
    REQUIRED_FIELDS
}