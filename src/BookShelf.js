import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book.js'

class BookShelf extends Component {
  render() {
    const {code, title} = this.props.details
    const shelves = this.props.shelves
    const booksOnThisShelf = this.props.books.filter((book) => {
      return shelves[code] && shelves[code].includes(book.id)
    })
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {booksOnThisShelf.map((book) => (
              <Book
                key={book.id}
                book={book}
                shelves={shelves}
                reshelveBook={this.props.reshelveBook}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

BookShelf.propTypes = {
  details: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  shelves: PropTypes.object.isRequired,
  reshelveBook: PropTypes.func.isRequired,
}

export default BookShelf
