import React, { useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState('')

  if (!props.show) {
    return null
  }
  let books = props.books
  const genres = books.map(b => b.genres).reduce((a, b) => a.concat(b))
  const uniqueGenres = [...new Set(genres)]

  if(genre !== '') {
    books = books.filter(b => b.genres.includes(genre))
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {uniqueGenres.map(g =>
          <button key={g} onClick={() => setGenre(g)}>{g}</button>
        )}
        <button onClick={() => setGenre('')}>all genres</button>
    </div>
  )
}

export default Books