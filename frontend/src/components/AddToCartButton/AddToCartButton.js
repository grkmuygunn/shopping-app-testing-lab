import React from 'react'

const AddToCartButton = ({ onClick, disabled, children }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-2 rounded-full font-semibold ${
        !disabled
          ? 'bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      }`}
      disabled={disabled}
      data-testid={disabled ? 'out-of-stock-button' : 'add-to-cart-button'}
    >
      {children}
    </button>
  )
}

export default AddToCartButton