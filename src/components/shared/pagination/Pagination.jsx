import React from 'react'
import ReactPaginate from 'react-paginate';
import { LeftArrowSvg } from '../../../svgFiles/LeftArrowSvg';

const Pagination = ({ pageCount = 5, onPageChange, currentPage = 0 }) => {
    const handlePageClick = (event) => {
        if (onPageChange) {
            onPageChange(event);
        }
    }
    
  return (
    <div className='pagination'>
        <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        forcePage={currentPage}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination-container"
        pageClassName="pagination-item"
        activeClassName="active"
      />
    </div>
  )
}

export default Pagination