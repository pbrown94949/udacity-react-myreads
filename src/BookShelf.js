import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book.js'

class BookShelf extends Component {
  render() {
    const {id, label, books, shelves, shelfContents, reshelveBook} = this.props
    const booksOnThisShelf = books.filter((book) => {
      return shelfContents[id] && shelfContents[id].includes(book.id)
    })
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{label}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {booksOnThisShelf.map((book, index) => (
              <Book
                key={index}
                book={book}
                shelves={shelves}
                shelfContents={shelfContents}
                reshelveBook={reshelveBook}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

BookShelf.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  shelfContents: PropTypes.object.isRequired,
  reshelveBook: PropTypes.func.isRequired,
}

export default BookShelf
