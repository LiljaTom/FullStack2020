import { gql } from '@apollo/client'

export const CREATE_BOOK = gql`
mutation CREATE_BOOK($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ){
    title
    published
    author
  }
}
`
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation UPDATE_AUTHOR($name: String!, $setBornTo: Int! ) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ){
      name
      born
      bookCount
    }
  }
`