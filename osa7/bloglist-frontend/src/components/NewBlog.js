import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const NewBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()

    props.createBlog({
      title, author, url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={handleNewBlog}>
        <Form.Group>

          <Form.Label>Author</Form.Label>
          <Form.Control
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <Form.Label>Title</Form.Label>
          <Form.Control
            id='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <Form.Label>Url</Form.Label>
          <Form.Control
            id='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <Button variant="primary" id="create">create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default NewBlog