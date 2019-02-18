import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { Link } from 'react-router-dom'

class SearchBooks extends Component {
  state = {
    results: [],
  }
  updateQuery = (event) => {
    const query = event.target.value
    if (query === '') {
      this.setState(() => ({
        results: []
      }))
    } else {
      BooksAPI.search(query)
      .then((books) => {
        this.setState(() => ({
          results: Array.isArray(books) ? books : []
        }))
      })
    }
  }
  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <div className='close-search'>
            <Link
              to='/'
              className='close-search'
            />
          </div>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.updateQuery(event)}
              />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.results.map((book) => (
              <Book
                key={book.id}
                book={book}
                shelves={this.props.shelves}
                reshelveBook={this.props.reshelveBook}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

SearchBooks.propTypes = {
  shelves: PropTypes.object.isRequired,
  reshelveBook: PropTypes.func.isRequired,
}

export default SearchBooks
