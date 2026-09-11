import React from 'react'
import './index.css'

const Pagination = props => {
  const {pageNo, onNextPage, onPrevPage, totalPages = 500} = props

  const onClickPrev = () => {
    if (pageNo > 1) {
      onPrevPage()
    }
  }

  const onClickNext = () => {
    if (pageNo < totalPages) {
      onNextPage()
    }
  }

  return (
    <div className="pagination-container">
      <button
        type="button"
        className="pagination-btn"
        onClick={onClickPrev}
        disabled={pageNo <= 1}
      >
        Prev
      </button>
      <p className="page-number">{pageNo}</p>
      <button
        type="button"
        className="pagination-btn"
        onClick={onClickNext}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
