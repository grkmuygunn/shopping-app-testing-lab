import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Header from '../../components/Header/Header'
import AddToCartButton from '../../components/AddToCartButton/AddToCartButton'

import { loadingLabel, productNotFoundError, backToHomepageLabel } from '../constants'
import { addToCartTitle, outOfStockTitle } from '../../components/constants'

const ProductDetail = ({ cartItems, addToCart }) => {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4567/api/products/${id}`)
        setProduct(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch product details')
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) return <div className="text-center mt-8">{loadingLabel}</div>
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>
  if (!product) return <div className="text-center mt-8">{productNotFoundError}</div>

  return (
    <div className="min-h-screen bg-gray-100">
      <Header cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)} />
      <div className="container mx-auto px-4 py-12">
        <Link to="/" className="text-indigo-600 hover:text-indigo-800 mb-8 inline-block">
          &larr; {backToHomepageLabel}
        </Link>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img className="h-96 w-full object-cover md:w-96" src={product.image_url} alt={product.title} />
            </div>
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-3xl font-bold text-indigo-600 mb-4">${product.price.toFixed(2)}</p>
              <p className="mb-4">In stock: {product.stock}</p>
              <AddToCartButton
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
              >
                {product.stock > 0 ? addToCartTitle : outOfStockTitle}
              </AddToCartButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail