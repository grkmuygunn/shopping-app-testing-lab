import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'

import * as constants from './constants'

const Checkout = ({ cartItems }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    address: '',
    country: '',
    acknowledgment: false
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const countries = constants.countriesList

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }))
    setTouched(prev => ({ ...prev, [name]: true }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = constants.nameValidationError
    if (!formData.surname.trim()) newErrors.surname = constants.surnameValidationError
    if (!formData.address.trim()) newErrors.address = constants.addressValidationError
    if (!formData.country) newErrors.country = constants.countryValidationError
    if (!formData.acknowledgment) newErrors.acknowledgment = constants.ackValidationError
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length === 0) {
      // Form is valid, proceed to finish page
      onCheckoutComplete()
    } else {
      setErrors(newErrors)
      setTouched({
        name: true,
        surname: true,
        address: true,
        country: true,
        acknowledgment: true
      })
    }
  }

  const onCheckoutComplete = () => {
    navigate('/finish')
  }

  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.surname.trim() !== '' &&
      formData.address.trim() !== '' &&
      formData.country !== '' &&
      formData.acknowledgment
    )
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div>
      <Header cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)} />
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-6">{constants.checkoutTitle}</h1>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <p className="text-sm text-gray-600 mb-4">{constants.requiredFieldsText}</p>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">{constants.nameFieldLabel}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
            {touched.name && errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="surname" className="block mb-2">{constants.surnameFieldLabel}</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
            {touched.surname && errors.surname && <p className="text-red-500 mt-1">{errors.surname}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block mb-2">{constants.addressFieldLabel}</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
            {touched.address && errors.address && <p className="text-red-500 mt-1">{errors.address}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="country" className="block mb-2">{constants.countryFieldLabel}</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">{constants.countryFieldPlaceholder}</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            {touched.country && errors.country && <p className="text-red-500 mt-1">{errors.country}</p>}
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="acknowledgment"
                checked={formData.acknowledgment}
                onChange={handleChange}
                className="mr-2"
              />
              <span>{constants.acknowledgementText}</span>
            </label>
            {touched.acknowledgment && errors.acknowledgment && <p className="text-red-500 mt-1">{errors.acknowledgment}</p>}
          </div>
          <div className="mb-4">
            <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 rounded ${isFormValid()
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            disabled={!isFormValid()}
          >
            {constants.proceedLabel}
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/cart" className="text-blue-500 hover:underline">{constants.backToCartLabel}</Link>
        </div>
      </div>
    </div>
  )
}

export default Checkout