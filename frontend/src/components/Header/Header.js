import React from 'react'
import { Link } from 'react-router-dom'

import { cartTitle, siteNameTitle, headerID } from '../constants'

const Header = ({ cartItemCount }) => {
  return (
    <header data-testid={headerID} className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className="text-3xl font-extrabold tracking-tight">
          <span className="text-yellow-300">{siteNameTitle}</span>
        </Link>
        <Link to="/cart" className="flex items-center space-x-2 bg-white text-indigo-600 px-4 py-2 rounded-full transition duration-300 hover:bg-indigo-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="font-semibold">{cartTitle}</span>
          {cartItemCount > 0 && (
            <span className="bg-yellow-300 text-indigo-600 rounded-full px-2 py-1 text-xs font-bold">
              {cartItemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}

export default Header