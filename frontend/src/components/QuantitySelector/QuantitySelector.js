import React from 'react'

const QuantitySelector = ({ quantity, onIncrease, onDecrease, max }) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onDecrease}
        className="px-3 py-1 rounded-full transition duration-300 bg-gray-200 hover:bg-gray-300"
      >
        -
      </button>
      <span className="font-semibold">{quantity}</span>
      <button
        onClick={onIncrease}
        className={`px-3 py-1 rounded-full transition duration-300 ${quantity >= max
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-gray-200 hover:bg-gray-300'
          }`}
        disabled={quantity >= max}
      >
        +
      </button>
    </div>
  )
}

export default QuantitySelector
