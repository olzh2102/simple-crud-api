const supertest = require('supertest')
const uuid = require('uuid');

const {app, main} = require('./app')
const {writeInto} = require('./util')

const server = main('./data.test.json', process.env.TEST_PORT)
const request = supertest(server)

jest.mock('uuid', () => {
    return {
        v4: jest.fn().mockReturnValue('abc'),
        validate: jest.fn().mockReturnValue(true)
    }
})

describe('Application endpoints', () => {  
    afterAll((done) => {
        server.close(done)
        app.close(done)

        uuid.v4.mockReset()
        uuid.validate.mockReset()
    });

    afterEach((done) => {
        writeInto('./data.test.json', { persons: [] })
        done()
    })

    it('should return list of persons (empty list): GET', async () => {
        const res = await request.get('/api/person')

        expect(res.status).toBe(200)
        expect(res.body).toEqual([])
    })

    it('should return newly created person object - GET:id', async () => {
        const data = { name: 'a', age: 1, hobbies: ['a'] }

        const res = await request.post('/api/person').send(data)

        expect(res.status).toBe(201)
        expect(res.body).toEqual({...data, id: 'abc'})
    })

    it('should return person with passed id - POST', async () => {
        const data = { name: 'a', age: 1, hobbies: ['a'] }
        await request.post('/api/person').send(data)

        const res = await request.get('/api/person/abc')

        expect(res.body).toEqual({...data, id: 'abc'})
    })

    it('should return updated person with passed id - PUT', async () => {
        const data = { name: 'a', age: 1, hobbies: ['a'] }
        await request.post('/api/person').send(data)

        const res = await request.put('/api/person/abc').send({ age: 99 })

        expect(res.body).toEqual({ ...data, id: 'abc', age: 99 })
    })

    it('should return 201 code indicating of deleted object - DELETE', async () => {
        const data = { name: 'a', age: 1, hobbies: ['a'] }
        await request.post('/api/person').send(data)

        const res = await request.delete('/api/person/abc')
        
        expect(res.status).toBe(204)
    })

    it('should return corresponding message and status if object not found- GET:id', async () => {
        const data = { name: 'a', age: 1, hobbies: ['a'] }
        await request.post('/api/person').send(data)
        
        await request.delete('/api/person/abc')
        const res = await request.get('/api/person/abc')
        
        expect(res.status).toBe(404)
        expect(res.body).toEqual({ message: 'Person with id abc not found' })
    })
})


