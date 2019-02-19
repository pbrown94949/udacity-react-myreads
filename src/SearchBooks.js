import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { Link } from 'react-router-dom'
import {DebounceInput} from 'react-debounce-input';

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
    const {shelves, shelfContents, reshelveBook} = this.props
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
            <DebounceInput
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.updateQuery(event)}
              minLength={2}
              debounceTimeout={300} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.results.map((book, index) => (
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

SearchBooks.propTypes = {
  shelves: PropTypes.array.isRequired,
  shelfContents: PropTypes.object.isRequired,
  reshelveBook: PropTypes.func.isRequired,
}

export default SearchBooks
