const supertest = require('supertest')
const server = require('./app')

const request = supertest(server)

describe('Application endpoints', () => {  
    afterAll(done => {
        server.close();
        done();
    });


    it('should return all available persons', async () => {
        const res = await request.get('/api/persons')
        
        expect(res.status).toBe(200)
        expect(res.body.length).toBe(2)
    })

    it('should return specific person', async () => {
        const id = 1
        const res = await request.get(`/api/persons/${id}`)
        console.log(res.body)

        expect(res.status).toBe(200)
        expect(res.body.id).toBe(1)
        expect(res.body.name).toBe('Nurlan')
    })
})


