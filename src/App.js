import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import { Route, Link } from 'react-router-dom'
import SearchBooks from './SearchBooks'

const shelves = [
  {code: 'currentlyReading', title: "Currently Reading"},
  {code: 'wantToRead', title: "Want to Read"},
  {code: 'read', title: "Read"}
]

class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: {},
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => {
      const shelves = {}
      books.forEach((book) => {
        shelves[book.shelf] = []
      })
      books.forEach((book) => {
        shelves[book.shelf].push(book.id)
      })
      this.setState(() => ({
        books,
        shelves
      }))
    })
  }
  reshelveBook = (book, newShelf) => {
    BooksAPI.update(book, newShelf)
    .then((shelves) => {
      this.setState(() => ({
        shelves
      }))
    })
    const index = this.state.books.map((book) => book.id).indexOf(book.id)
    if (newShelf === 'none') {
      this.setState(() => ({
        books: this.state.books.filter((b) => b.id !== book.id)
      }))
    } else if (index === -1 && newShelf !== 'none') {
      this.setState((currentState) => ({
        books: [...currentState.books, book]
      }))
    }
  }
  render() {
    return (
      <div className="app">
        <Route path='/search' render = {() => (
          <SearchBooks
            shelves={this.state.shelves}
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
                    details={shelf}
                    books={this.state.books}
                    shelves={this.state.shelves}
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
