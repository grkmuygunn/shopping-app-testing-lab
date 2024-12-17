import { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { 
  firstPageNavID, 
  prevPageNavID,
  nextPageNavID,
  lastPageNavID 
} from '../constants'

const PaginationButton = ({ onClick, disabled, children, dataTestId, className }) => (
  <button
    data-testid={dataTestId}
    onClick={onClick}
    disabled={disabled}
    className={className || "px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition duration-300"}
  >
    {children}
  </button>
)

const Pagination = ({ totalPages, onChange }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = useCallback(async (newPage) => {
    if (newPage < 1 || newPage > totalPages) return
    
    setCurrentPage(newPage)
    await onChange(newPage)
    
    if (Math.abs(newPage - currentPage) > 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [totalPages, onChange, currentPage])

  useEffect(() => {
    if (currentPage > totalPages) {
      handlePageChange(1)
    }
  }, [totalPages, currentPage, handlePageChange])

  return (
    <nav aria-label="Pagination" className="mt-12 flex justify-center items-center space-x-2">
      <PaginationButton
        dataTestId={firstPageNavID}
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      >
        &laquo;
      </PaginationButton>
      <PaginationButton
        dataTestId={prevPageNavID}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &larr;
      </PaginationButton>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <PaginationButton
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 rounded-md ${
            currentPage === page
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-indigo-600 hover:bg-indigo-100'
          } transition duration-300`}
        >
          {page}
        </PaginationButton>
      ))}
      <PaginationButton
        dataTestId={nextPageNavID}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &rarr;
      </PaginationButton>
      <PaginationButton
        dataTestId={lastPageNavID}
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        &raquo;
      </PaginationButton>
    </nav>
  )
}

PaginationButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  dataTestId: PropTypes.string,
  className: PropTypes.string
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Pagination