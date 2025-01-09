import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header'

import {
  postPurchaseText,
  shippingInfoText,
  backToHomepageLabel
} from '../constants'

const FinishPage = ({ clearCart }) => {
  const handleReturnToHomepage = () => {
    clearCart();
  };

  return (
    <div>
      <Header cartItemCount={0} />
      <div className="container mx-auto mt-8 px-4 text-center">
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-green-600">
            {postPurchaseText}
          </h1>
          <p className="text-xl mb-8">{shippingInfoText}</p>
          <svg
            className="mx-auto w-24 h-24 text-green-500 mb-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <Link
            to="/"
            onClick={handleReturnToHomepage}
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
          >
            {backToHomepageLabel}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FinishPage;
