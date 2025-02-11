import React from 'react'
import { useNavigate } from 'react-router-dom'
import AddToCartButton from '../AddToCartButton/AddToCartButton'
import QuantitySelector from '../QuantitySelector/QuantitySelector'

import { addToCartTitle, outOfStockTitle } from '../constants'

const ProductCard = ({ product, addToCart, cartItems }) => {
  const navigate = useNavigate()

  const handleCardClick = (e) => {
    if (e.target.tagName !== 'BUTTON') {
      navigate(`/product/${product.id}`)
    }
  }

  const cartItem = cartItems.find((item) => item.id === product.id)
  const quantityInCart = cartItem ? cartItem.quantity : 0

  return (
    <div
      className="product-card bg-white rounded-lg overflow-hidden shadow-lg transition duration-300 hover:shadow-2xl"
      onClick={handleCardClick}
      data-testid="product-card"
    >
      <img
        src={product.image_url}
        alt={product.title}
        className="w-full h-48 object-cover"
        data-testid="product-image"
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          {product.title}
        </h2>
        <p className="text-2xl font-bold text-indigo-600 mb-4">
          ${product.price.toFixed(2)}
        </p>
        {quantityInCart === 0 ? (
          <AddToCartButton
            onClick={(e) => {
              e.stopPropagation()
              addToCart(product)
            }}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? addToCartTitle : outOfStockTitle}
          </AddToCartButton>
        ) : (
          <QuantitySelector
            quantity={quantityInCart}
            onIncrease={(e) => {
              e.stopPropagation()
              addToCart(product)
            }}
            onDecrease={(e) => {
              e.stopPropagation()
              addToCart(product, -1)
            }}
            max={product.stock}
          />
        )}
      </div>
    </div>
  )
}

export default ProductCard
