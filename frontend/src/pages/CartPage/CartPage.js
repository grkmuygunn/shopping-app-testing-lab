import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header'

import { 
  yourCartTitle, 
  emptyCartText, 
  continueShoppingText, 
  removeLabel, 
  proceedLabel 
} from '../constants'

const Cart = ({ cartItems, updateQuantity, removeFromCart }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-100">
      <Header cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8" data-testid="cart-title">{yourCartTitle}</h1>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600" data-testid="cart-empty-message">{emptyCartText} <Link to="/" className="text-indigo-600 hover:text-indigo-800">{continueShoppingText}</Link></p>
        ) : (
          <>
            <div className="space-y-6" data-testid="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center bg-white p-6 rounded-lg shadow-md" data-testid="cart-item">
                  <img src={item.image_url} alt={item.title} className="w-24 h-24 object-cover rounded-md mr-6" />
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold text-gray-800" data-testid="cart-item-title">{item.title}</h2>
                    <p className="text-indigo-600 font-bold" data-testid="cart-item-price">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2" data-testid="cart-item-quantity">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className={`px-3 py-1 rounded-full transition duration-300 ${
                        item.quantity <= 1
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                    disabled={item.quantity <= 1}
                    data-testid="decrease-quantity"
                    >
                    -
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className={`px-3 py-1 rounded-full transition duration-300 ${
                        item.quantity >= item.stock
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                    disabled={item.quantity >= item.stock}
                    data-testid="increase-quantity"
                    >
                    +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-6 text-red-500 hover:text-red-700 transition duration-300"
                    data-testid="remove-item"
                  >
                    {removeLabel}
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-12 bg-white p-6 rounded-lg shadow-md" data-testid="cart-summary">
              <p className="text-2xl font-bold text-gray-800 mb-4">Total: ${total.toFixed(2)}</p>
              <Link
                to="/checkout"
                className="block w-full text-center px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition duration-300"
                data-testid="proceed-to-checkout"
              >
                {proceedLabel}
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart