import React, { useState } from 'react'

const Blog = ({ blog, handleLike, deleteBlog }) => {
  const [showAll, setShowAll] = useState(false)

  const toggleVisibility = () => {
    setShowAll(!showAll)
  }

  const blogStyle ={
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))

  const canDeleteBlog = () => {
    return user.username === blog.user.username
  }

  if(showAll) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          likes: {blog.likes} <button onClick={handleLike}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        {canDeleteBlog() ? <button onClick={deleteBlog}>remove</button> : null}
      </div>
    )
  }

  return(
    <div style={blogStyle}>
      <div key>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
    </div>
  )
}
export default Blog
