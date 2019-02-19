import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'
import BookShelves from './BookShelves'
import SearchBooks from './SearchBooks'
import FourOhFour from './FourOhFour'

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
    // Refresh this.state.shelfContents with the API response
    BooksAPI.update(book, newShelf)
    .then((shelfContents) => {
      this.setState(() => ({
        shelfContents
      }))
    })
    // True up this.state.books
    const bookIsInState = this.state.books.filter(b => b.id === book.id).length > 0
    if (bookIsInState && newShelf === 'none') {
      this.setState((currentState) => ({
        books: currentState.books.filter(b => b.id !== book.id)
      }))
    } else if (!bookIsInState && newShelf !== 'none') {
      this.setState((currentState) => ({
        books: [...currentState.books, book]
      }))
    }
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => {
      const shelfContents = {}
      /* shelfContents has the same structure as the object returned
       * by BooksAPI.update()
       */
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
        <Switch>
          <Route path='/search' render = {() => (
            <SearchBooks
              shelves={shelves}
              shelfContents={shelfContents}
              reshelveBook={this.reshelveBook}
            />
          )} />
          <Route exact path='/' render = {() => (
            <BookShelves
              books={books}
              shelves={shelves}
              shelfContents={shelfContents}
              reshelveBook={this.reshelveBook}
            />
          )} />
          <Route component={FourOhFour} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
