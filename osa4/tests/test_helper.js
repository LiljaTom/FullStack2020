const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "Title",
        author: "Author",
        url: "url",
        likes: 5
    },
    {
        title: "Test title",
        author: "Test author",
        url: "Test url",
        likes: 8
    }
]

const blogsInDb = async() => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async() => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const createUser = async() => {

}


module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb
}