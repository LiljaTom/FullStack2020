
import React, { useState, useEffect } from 'react'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const authorResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includeIn = (set, object) => 
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if(!includeIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: { allBooks : dataInStore.allPersons.concat(addedBook)}
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(subscriptionData)
      updateCacheWith(addedBook)
    }
  })

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if(token) {
      setToken(token)
    }
  }, [])



  if(authorResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  const authors = authorResult.data.allAuthors
  const books = booksResult.data.allBooks

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if(!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <Authors 
          show={page === 'authors'} authors={authors}
        />

        <Books 
          show={page === 'books'} books={books}
        />

        <LoginForm 
          show={page === 'login'} setToken={setToken}
        />
      </div>
    )
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => logout()}>logout</button>
      </div>

      <Authors
        show={page === 'authors'} authors={authors}
      />

      <Books
        show={page === 'books'} books={books}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App