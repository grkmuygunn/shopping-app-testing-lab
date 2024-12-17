import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import Header from '../../components/Header/Header'
import ProductCard from '../../components/ProductCard/ProductCard'
import Pagination from '../../components/Pagination/Pagination'
import { fetchProducts } from '../../services/api'
import { usePagination } from '../../hooks/usePagination'
import {
  collectionTitle,
  loadingLabel,
  failedLoadingError,
  ITEMS_PER_PAGE
} from '../constants'

const HomePage = ({ cartItems, addToCart }) => {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const {
    currentItems: currentProducts,
    totalPages,
    handlePageChange
  } = usePagination(products, ITEMS_PER_PAGE)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const data = await fetchProducts()
        setProducts(data.products)
        setError(null)
      } catch (error) {
        setError(failedLoadingError)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  const cartItemCount = useMemo(() => 
    cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  )

  return (
    <div className="min-h-screen bg-gray-100">
      <Header cartItemCount={cartItemCount} />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-12 text-center">
          {collectionTitle}
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {loading ? (
          <p className="text-center text-gray-600">{loadingLabel}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                addToCart={addToCart} 
                cartItems={cartItems} 
              />
            ))}
          </div>
        )}
        {!loading && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            onChange={handlePageChange}
          />
        )}
      </main>
    </div>
  )
}

HomePage.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired
    })
  ).isRequired,
  addToCart: PropTypes.func.isRequired
}

export default HomePage