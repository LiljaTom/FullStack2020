import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, { target: { value: 'TestTitle' } })
  fireEvent.change(author, { target: { value: 'TestAuthor' } })
  fireEvent.change(url, { target: { value: 'TestUrl' } })
  fireEvent.submit(form)

  expect(createBlog.mock.calls.length).toBe(1)

  expect(createBlog.mock.calls[0][0].title).toBe('TestTitle')
  expect(createBlog.mock.calls[0][0].author).toBe('TestAuthor')
  expect(createBlog.mock.calls[0][0].url).toBe('TestUrl')

})
