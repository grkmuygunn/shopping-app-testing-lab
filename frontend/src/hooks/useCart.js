import { useState } from 'react'

export const useCart = () => {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.max(0, Math.min(item.quantity + quantity, product.stock)) }
            : item
        ).filter(item => item.quantity > 0)
      }
      if (quantity > 0) {
        return [...prevItems, { ...product, quantity: Math.min(quantity, product.stock) }]
      }
      return prevItems
    })
  }

  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ).filter(item => item.quantity > 0)
    )
  }

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart
  }
}