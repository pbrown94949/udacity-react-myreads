import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger'

class Book extends Component {
  getBackgroundImage = (imageLinks) => {
    if (imageLinks != null && imageLinks.thumbnail != null) {
      return `url(${imageLinks.thumbnail})`
    } else {
      return 'none'
    }
  }

  render() {
    const {shelves, shelfContents, reshelveBook, book} = this.props
    const {title, authors, imageLinks} = this.props.book
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{
              width: 128,
              height: 193,
              backgroundImage: this.getBackgroundImage(imageLinks)
            }}></div>
            <BookShelfChanger
              book={book}
              shelves={shelves}
              shelfContents={shelfContents}
              reshelveBook={reshelveBook}
            />
          </div>
          <div className="book-title">{title}</div>
          {authors != null && (
            <div className="book-authors">
              <ul>
                {authors.map((author, index) => (
                  <li key={index}>
                    {author}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </li>
    )
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  shelves: PropTypes.array.isRequired,
  shelfContents: PropTypes.object.isRequired,
  reshelveBook: PropTypes.func.isRequired,
}

export default Book
