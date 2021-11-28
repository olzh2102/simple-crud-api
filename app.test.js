const supertest = require('supertest')
const server = require('./app')

const request = supertest(server)

describe('Application endpoints', () => {  
    afterAll(done => {
        server.close();
        done();
    });


    it('should return all available persons', async () => {
        const res = await request.get('/api/person')
        
        expect(res.status).toBe(200)
        expect(res.body.length).toBe(2)
    })

    it('should return specific person', async () => {
        const id = 1
        const res = await request.get(`/api/person/${id}`)

        expect(res.status).toBe(200)
        expect(res.body.id).toBe(1)
        expect(res.body.name).toBe('Nurlan')
    })

    it('should create new person', async () => {
        const res = await request
            .post('/api/person')
            .send({name: 'A', age: 2, hobbies: ['cry']})
            
        console.log(res)
    })
})


