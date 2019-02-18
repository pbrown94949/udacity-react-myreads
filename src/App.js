import React from 'react'
import { Route, Link } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'

const shelves = [
  {id: 'currentlyReading', label: "Currently Reading"},
  {id: 'wantToRead', label: "Want to Read"},
  {id: 'read', label: "Read"}
]

class BooksApp extends React.Component {
  state = {
    books: [],
    shelfContents: {},
  }

  reshelveBook = (book, newShelf) => {
    BooksAPI.update(book, newShelf)
    .then((shelfContents) => {
        BooksAPI.getAll()
        .then((books) => {
          this.setState(() => ({
            books,
            shelfContents
          }))
        })
    })
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => {
      const shelfContents = {}
      books.forEach((book) => {
        shelfContents[book.shelf] = []
      })
      books.forEach((book) => {
        shelfContents[book.shelf].push(book.id)
      })
      this.setState(() => ({
        books,
        shelfContents
      }))
    })
  }

  render() {
    const {books, shelfContents} = this.state
    return (
      <div className="app">
        <Route path='/search' render = {() => (
          <SearchBooks
            shelves={shelves}
            shelfContents={shelfContents}
            reshelveBook={this.reshelveBook}
          />
        )} />
        <Route exact path='/' render = {() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelves.map((shelf, index) => (
                  <BookShelf
                    key={index}
                    id={shelf.id}
                    label={shelf.label}
                    shelves={shelves}
                    books={books}
                    shelfContents={shelfContents}
                    reshelveBook={this.reshelveBook}
                  />
                ))}
              </div>
            </div>
            <Link
              to='/search'
              className='open-search'>
              Open Search
            </Link>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
