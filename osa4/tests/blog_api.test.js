const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')
const api = supertest(app)


beforeEach(async() => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
    
})

test('blogs are returned as json', async() => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('returns all blogs', async() => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('blogs identification field is named id', async() => {
    const response = await api.get('/api/blogs')
    const body = response.body[0].id
    expect(body).toBeDefined()
})

test('a valid blog can be added', async() => {
    const user = { username: "Tester", name: "testerName", password: "Salasana" }
    await api.post('/api/users').send(user)

    const login = await api.post('/api/login').send({username: "Tester", password: "Salasana"})
    const token = login.body.token

    const newBlog = {
        title: "new Blog",
        author: "new Author",
        url: "new Url",
        likes: 0
    }

    await api
        .post('/api/blogs')
        .set('Authorization', 'bearer '+token)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    const contents = blogsAtEnd.map(blog => blog.title)

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
    expect(contents).toContain('new Blog')
})

test('blog likes are set to 0 by default', async() => {
    const user = { username: "Tester", name: "testerName", password: "Salasana" }
    await api.post('/api/users').send(user)

    const login = await api.post('/api/login').send({username: "Tester", password: "Salasana"})
    const token = login.body.token

    const newBlog = {
        title: "Title",
        author: "Author",
        url: "Url"
    }
    await api.post('/api/blogs')
        .set('Authorization', 'bearer '+token)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const lastBlogLikes = blogsAtEnd[blogsAtEnd.length - 1].likes

    expect(lastBlogLikes).toBe(0)
})

test('blog without title or url is not added', async() => {
    const user = { username: "Tester", name: "testerName", password: "Salasana" }
    await api.post('/api/users').send(user)

    const login = await api.post('/api/login').send({username: "Tester", password: "Salasana"})
    const token = login.body.token

    const newBlog = {
        author: "Author",
        likes: 6
    }

    await api.post('/api/blogs')
        .set('Authorization', 'bearer '+token)
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
})

test('blog can be updated', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blog = blogsAtStart[0]

    const user = { username: "Tester", name: "testerName", password: "Salasana" }
    await api.post('/api/users').send(user)

    const login = await api.post('/api/login').send({username: "Tester", password: "Salasana"})
    const token = login.body.token

    const updatedBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1
    }

    await api.put(`/api/blogs/${blog.id}`)
        .set('Authorization', 'bearer '+token)
        .send(updatedBlog)
        .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const blogAtEnd = blogsAtEnd[0]

    expect(blogAtEnd.likes).toBe(blog.likes + 1)
})


test('Can create blog and delete it', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blog = {title: "Title", author: "author", url:"url", likes: 0}

    const user = { username: "Tester", name: "testerName", password: "Salasana" }
    await api.post('/api/users').send(user)

    const login = await api.post('/api/login').send({username: "Tester", password: "Salasana"})
    const token = login.body.token

    await api
        .post('/api/blogs')
        .set('Authorization', 'bearer '+token)
        .send(blog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const addedBlogs = await helper.blogsInDb()
    const blogId = addedBlogs[2].id

    await api
        .delete(`/api/blogs/${blogId}`)
        .set('Authorization', 'bearer '+token)
        .expect(204)


    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
})

test('Cannot create blog without token', async() => {
    const newBlog = {
        title: "InvalidTitle",
        author: "InvalidAuthor",
        url: "InvalidUrl",
        likes: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
})


afterAll(() => {
    mongoose.connection.close()
})