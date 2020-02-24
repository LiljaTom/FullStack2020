import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component', () => {
  const user = {
    username: 'username',
    name: 'name'
  }
  const blog ={
    title: 'TestTitle',
    author: 'TestAuthor',
    url: 'TestUrl',
    likes: 5,
    user: user
  }

  window.localStorage.setItem(
    'loggedBlogappUser', JSON.stringify(user)
  )

  test('renders title and author but not url and like', () => {

    const component = render(
      <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
      'TestTitle', 'TestAuthor'
    )

    expect(component.container).not.toHaveTextContent(
      'likes', 'TestUrl'
    )
  })

  test('after clicking view it shows also url and likes', () => {

    const component = render(
      <Blog blog={blog} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'TestTitle',
      'TestAuthor',
      'likes',
      'TestUrl'
    )
  })

  test('clicking like button twice calls event handler twice', () => {
    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} handleLike={mockHandler} />
    )
    const button = component.getByText('view')
    fireEvent.click(button)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls.length).toBe(2)
  })

})

