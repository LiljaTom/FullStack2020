import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return(
    <div>
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
    </div>
  )
}

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return(
    <div>
      {blogs.sort(byLikes).map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

}

export default Blogs