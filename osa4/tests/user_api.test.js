const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')
const api = supertest(app)


describe('when there is initially one user at db', () => {
    beforeEach(async() => {
        await User.deleteMany({})
        const user = new User({ username: 'root',name: 'name', password: 'sekret'})
        await user.save()
    })

    test('returns one user', async() => {
        const response = await api.get('/api/users')
        expect(response.body.length).toBe(1)
    })

    test('creation succeeds with a fresh username', async() => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'Testaaja',
            name: 'TestName',
            password: 'salasana',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails if username is not unique and respons with correct statuscode', async() => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'User',
            password: 'salasana'
        }

        const result = await api 
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('creation fails if username length is under 3 char', async() => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'te',
            name: 'name',
            password: 'salasana'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd.length).toBe(usersAtStart.length)
    })


})



afterAll(() => {
    mongoose.connection.close()
})