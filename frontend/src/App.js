import React from 'react'
import { BrowserRouter as DefaultRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage'
import CartPage from './pages/CartPage/CartPage'
import CheckoutPage from './pages/CheckoutPage/CheckoutPage'
import FinishPage from './pages/FinishPage/FinishPage'
import { useCart } from './hooks/useCart'

function App({ Router = DefaultRouter }) {
  const { cartItems, addToCart, updateQuantity, removeFromCart, clearCart } = useCart()

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage cartItems={cartItems} addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetailPage cartItems={cartItems} addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cartItems={cartItems} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
        <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} />} />
        <Route path="/finish" element={<FinishPage clearCart={clearCart} />} />
      </Routes>
    </Router>
  )
}

export default App
