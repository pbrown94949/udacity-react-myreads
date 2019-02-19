import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './App.css'
import BookShelf from './BookShelf'

function BookShelves(props) {
  const {books, reshelveBook, shelfContents, shelves} = props
  return (
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
              reshelveBook={reshelveBook}
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
  )
}

BookShelves.propTypes = {
  books: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  shelfContents: PropTypes.object.isRequired,
  reshelveBook: PropTypes.func.isRequired,
}

export default BookShelves
