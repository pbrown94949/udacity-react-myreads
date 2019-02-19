import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookShelfChanger extends Component {

  handleChange = (event) => {
    const newShelf = event.target.value
    const {reshelveBook, book} = this.props
    reshelveBook(book, newShelf)
  }

  getCurrentShelf = () => {
    const {shelfContents, book} = this.props
    for (let shelfId of Object.getOwnPropertyNames(shelfContents)) {
      if (shelfContents[shelfId].includes(book.id)) {
        return shelfId;
      }
    }
    return 'none'
  }

  getSelectOptions = () => {
    const result = []
    result.push({value: "move", text: "Move to..."})
    for (let shelf of this.props.shelves) {
      result.push({value: shelf.id, text: shelf.label})
    }
    result.push({value: "none", text: "None"})
    return result
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select onChange={this.handleChange} value={this.getCurrentShelf()}>
          {this.getSelectOptions().map((option, index) => (
            <option key={index} disabled={index === 0}value={option.value}>{option.text}</option>
          ))}
        </select>
      </div>
    )
  }
}

BookShelfChanger.propTypes = {
  book: PropTypes.object.isRequired,
  shelves: PropTypes.array.isRequired,
  shelfContents: PropTypes.object.isRequired,
  reshelveBook: PropTypes.func.isRequired,
}

export default BookShelfChanger
