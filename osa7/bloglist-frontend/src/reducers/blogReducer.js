import blogService from '../services/blogs'

const reducer = (state=[], action) => {
  switch(action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'LIKE_BLOG': {
    const blog = action.data
    const id = blog.id
    return state.map(b =>
      b.id !== id ? b : blog
    )
  }
  case 'REMOVE_BLOG': {
    const blog = action.data
    const id = blog.id
    return state.map(b =>
      b.id !== id ? b : null
    )
  }
  default:
    return state
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    const id = blog.id
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: blog
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = {
      ...blog,
      user: blog.user,
      likes: blog.likes + 1
    }
    await blogService.update(updatedBlog)
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}


export default reducer