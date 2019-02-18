import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  getBackgroundImage = (imageLinks) => {
    if (imageLinks != null && imageLinks.thumbnail != null) {
      return `url(${imageLinks.thumbnail})`
    } else {
      return 'none'
    }
  }
  handleChange = (event) => {
    const newShelf = event.target.value
    this.props.reshelveBook(this.props.book, newShelf)
  }
  getCurrentShelf = () => {
    const shelves = this.props.shelves
    const bookId = this.props.book.id
    for (let shelfId of Object.getOwnPropertyNames(shelves)) {
      if (shelves[shelfId].includes(bookId)) {
        return shelfId;
      }
    }
    return 'none'
  }
  render() {
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
            <div className="book-shelf-changer">
              <select onChange={this.handleChange} value={this.getCurrentShelf()}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
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
  shelves: PropTypes.object.isRequired,
  reshelveBook: PropTypes.func.isRequired,
}

export default Book
