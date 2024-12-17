import { useState, useMemo, useCallback } from 'react'

export const usePagination = (items, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1)
  
  const totalPages = useMemo(() => 
    Math.ceil(items.length / itemsPerPage), 
    [items.length, itemsPerPage]
  )
  
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    return items.slice(indexOfFirstItem, indexOfLastItem)
  }, [items, currentPage, itemsPerPage])

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return {
    currentPage,
    totalPages,
    currentItems,
    handlePageChange
  }
}

export default usePagination