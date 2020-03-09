import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import storage from './utils/storage'

import { setNotification, clearNotification } from './reducers/notificationReducer'
import { initializeUsers } from './reducers/usersReducer'
import { loadUser, clearUser } from './reducers/userReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

import loginService from './services/login'


const App = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])



  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      storage.saveUser(user)
      setUsername('')
      setPassword('')
      dispatch(loadUser())
      notify(`${user.name} welcome back!`)
    } catch(exception) {
      notify('wrong username/password')
    }
  }


  const padding = {
    padding: 5
  }


  const newBlog = async (blog) => {
    try {
      dispatch(createBlog(blog))
      blogFormRef.current.toggleVisibility()
      notify(`a new blog '${blog.title}' by ${blog.author} added!`)
    } catch(exception) {
      console.log(exception)
    }
  }


  const notify = (message) => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }


  const handleLogout = () => {
    dispatch(clearUser())
    storage.logoutUser()
  }



  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }


  return (
    <div className="container">
      <Router>
        <div>
          <Link style={padding} to="/">blogs</Link>
          <Link style={padding} to="/users">users</Link>
          <em>{user.name} logged in</em> <button onClick={handleLogout}>logout</button>
        </div>
        <h2>blog app</h2>
        <Switch>
          <Route path="/users/:id">
            <User users={users}/>
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/blogs/:id">
            <Blog blogs={blogs} user={user} />
          </Route>
          <Route path="/">
            <Notification />
            <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
              <NewBlog createBlog={newBlog}/>
            </Togglable>
            <Blogs />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App