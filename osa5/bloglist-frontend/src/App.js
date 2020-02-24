import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = React.createRef()

  const handleLogin = async(event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      handleNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleLike = async(id) => {
    const blog = blogs.find(b => b.id === id)
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    blogService.update(blog.id, updatedBlog)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
  }

  const deleteBlog = async(id) => {
    const blog = blogs.find(b => b.id === id)
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.deleteBlog(blog.id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
  }


  const handleNotification = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const createBlog = async(blog) => {

    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = { title: blog.title, author: blog.author, url: blog.url, likes: 0, user: user }
      await blogService.create(newBlog)

      handleNotification(`a new blog ${blog.title} by ${blog.author} added`)
      setBlogs(blogs.concat(newBlog))
    } catch (expection) {
      handleNotification('Error creating blog', 'error')
    }

  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification notification={notification}/>
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
      />
    </div>
  )

  const showBlogs = () => (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification}/>
      <p>{user.name} logged in <button onClick={() => handleLogout()}>logout</button></p>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <div>
        { blogs.sort((a, b) => {
          return b.likes - a.likes
        })
          .map(blog =>
            <Blog
              key={blog.id} blog={blog}
              handleLike={() => handleLike(blog.id)}
              deleteBlog={() => deleteBlog(blog.id)}
            />
          )}
      </div>
    </div>
  )

  return (
    <div>
      {user === null
        ? loginForm()
        : showBlogs()
      }
    </div>
  )
}

export default App