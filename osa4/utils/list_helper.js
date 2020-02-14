const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length === 0
        ? 0
        : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.map(blog => ({title: blog.title, author: blog.author, likes: blog.likes}))
        .reduce((max, blog) => 
        max.likes > blog.likes ? max : blog)  
}

const mostBlogs = (blogs) => {
    const result = _.map(_.countBy(blogs, "author"), (val, key) => ({ author: key, blogs: val}))
    .reduce((max, blog) => 
    max.blogs > blog.blogs ? max : blog)
    
    return result
}

const mostLikes = (blogs) => {
    const result = _(blogs).groupBy('author').map((objs, key) => {
        return {
            'author':key,
            'likes': _.sumBy(objs, 'likes')
        }
    }).value().reduce((max, blog) => max.likes > blog.likes ? max : blog)
    return result
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}