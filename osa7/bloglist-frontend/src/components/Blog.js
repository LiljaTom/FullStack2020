import React from 'react'
import { useParams } from 'react-router-dom'
import { removeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blogs, user }) => {
  const dispatch = useDispatch()

  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  if(!blog) {
    return null
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const own = user.username === blog.user.username

  const handleRemove = () => {
    dispatch(removeBlog(blog))
  }



  return (
    <div style={blogStyle}>
      <h2>{blog.title} by {blog.author}</h2>
      <div>{blog.url}</div>
      <div>likes {blog.likes}
        <button>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {own&&<button onClick={handleRemove}>remove</button>}

    </div>
  )
}

export default Blog

/*

{ blog, handleLike, handleRemove, own }

    <div style={blogStyle} className='blog'>
      <div>
        <i>{blog.title}</i> by {blog.author} <button onClick={() => setVisible(!visible)}>{label}</button>
      </div>
      {visible&&(
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes}
            <button onClick={() => handleLike(blog.id)}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {own&&<button onClick={() => handleRemove(blog.id)}>remove</button>}
        </div>
      )}
    </div>
  )

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    await blogService.update(likedBlog)
    //setBlogs(blogs.map(b => b.id === id ?  { ...blogToLike, likes: blogToLike.likes + 1 } : b))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      await blogService.remove(id)
      //setBlogs(blogs.filter(b => b.id !== id))
    }
  }

*/