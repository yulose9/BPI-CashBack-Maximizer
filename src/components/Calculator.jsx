// src/components/Calculator.jsx
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

const Calculator = () => {
  const [values, setValues] = useState({
    groceries: '',
    utilities: '',
    others: '',
  })

  const [warnings, setWarnings] = useState({
    groceries: '',
    utilities: '',
    others: '',
  })

  const [annualCapWarning, setAnnualCapWarning] = useState('')

  // Refs for animated values
  const monthlyRef = useRef(null)
  const annualRef = useRef(null)
  const prevCashback = useRef({ monthly: 0, annual: 0 })

  const formatCurrency = (value) => {
    if (!value) return ''
    return parseInt(value.replace(/,/g, ''), 10).toLocaleString('en-US')
  }

  const parseValue = (value) => {
    return parseFloat(value.replace(/,/g, '')) || 0
  }

  const getCashback = (amount, rate) => {
    return Math.floor(amount / 1000) * 1000 * (rate / 100)
  }

  const animateValue = (element, start, end, duration) => {
    if (!element) return

    let startTimestamp = null
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      const currentValue = progress * (end - start) + start
      element.textContent = `₱${currentValue.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }

  const calculateCashback = useCallback(() => {
    const parsedValues = {
      groceries: parseValue(values.groceries),
      utilities: parseValue(values.utilities),
      others: parseValue(values.others),
    }

    // Update warnings
    const newWarnings = {}
    Object.keys(parsedValues).forEach((cat) => {
      newWarnings[cat] =
        parsedValues[cat] > 0 && parsedValues[cat] < 1000
          ? 'Spend must be at least ₱1,000'
          : ''
    })
    setWarnings(newWarnings)

    // Calculate cashback
    const monthly =
      getCashback(parsedValues.groceries, 4) +
      getCashback(parsedValues.utilities, 1) +
      getCashback(parsedValues.others, 0.3)

    const annual = Math.min(monthly * 12, 15000)

    // Animate the values
    animateValue(monthlyRef.current, prevCashback.current.monthly, monthly, 500)
    animateValue(annualRef.current, prevCashback.current.annual, annual, 500)

    prevCashback.current = { monthly, annual }

    // Update annual cap warning
    setAnnualCapWarning(annual >= 15000 ? 'Annual ₱15,000 cap reached!' : '')
  }, [values])

  const handleInputChange = (field, value) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '')
    const formattedValue = numericValue ? formatCurrency(numericValue) : ''

    setValues((prev) => ({
      ...prev,
      [field]: formattedValue,
    }))
  }

  useEffect(() => {
    calculateCashback()
  }, [values, calculateCashback])

  return (
    <section
      id="calculator"
      className="mb-12 bg-black/20 p-6 rounded-2xl shadow-lg border border-white/10 backdrop-blur-sm animate-on-scroll"
    >
      <h2 className="text-2xl font-bold text-center mb-2">
        Estimate Your Annual Cashback
      </h2>
      <p className="text-center text-gray-300 mb-6 max-w-2xl mx-auto">
        Enter your estimated monthly spending. The cashback will update
        automatically.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="groceries"
              className="block text-sm font-medium text-gray-200"
            >
              🛒 Groceries (4% Cashback)
            </label>
            <div className="input-wrapper mt-1">
              <span className="peso-sign text-lg">₱</span>
              <input
                type="text"
                inputMode="numeric"
                id="groceries"
                placeholder="10,000"
                value={values.groceries}
                onChange={(e) => handleInputChange('groceries', e.target.value)}
                className="cashback-input block w-full p-2 border border-gray-500 rounded-md shadow-sm bg-gray-800/50 text-white focus:ring-bpi-gold focus:border-bpi-gold transition-all"
              />
            </div>
            <span className="text-yellow-400 text-xs mt-1 h-4 block">
              {warnings.groceries}
            </span>
          </div>

          <div>
            <label
              htmlFor="utilities"
              className="block text-sm font-medium text-gray-200"
            >
              💡 Utilities & Drugstores (1% Cashback)
            </label>
            <div className="input-wrapper mt-1">
              <span className="peso-sign text-lg">₱</span>
              <input
                type="text"
                inputMode="numeric"
                id="utilities"
                placeholder="5,000"
                value={values.utilities}
                onChange={(e) => handleInputChange('utilities', e.target.value)}
                className="cashback-input block w-full p-2 border border-gray-500 rounded-md shadow-sm bg-gray-800/50 text-white focus:ring-bpi-gold focus:border-bpi-gold transition-all"
              />
            </div>
            <span className="text-yellow-400 text-xs mt-1 h-4 block">
              {warnings.utilities}
            </span>
          </div>

          <div>
            <label
              htmlFor="others"
              className="block text-sm font-medium text-gray-200"
            >
              🛍️ Other Local Spend (0.3% Cashback)
            </label>
            <div className="input-wrapper mt-1">
              <span className="peso-sign text-lg">₱</span>
              <input
                type="text"
                inputMode="numeric"
                id="others"
                placeholder="8,000"
                value={values.others}
                onChange={(e) => handleInputChange('others', e.target.value)}
                className="cashback-input block w-full p-2 border border-gray-500 rounded-md shadow-sm bg-gray-800/50 text-white focus:ring-bpi-gold focus:border-bpi-gold transition-all"
              />
            </div>
            <span className="text-yellow-400 text-xs mt-1 h-4 block">
              {warnings.others}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center bg-black/10 p-6 rounded-lg h-full">
          <h3 className="text-lg font-semibold text-gray-200 mb-4">
            Your Estimated Cashback
          </h3>
          <div className="w-full">
            {/* Monthly Cashback */}
            <div className="text-center">
              <p className="text-4xl font-bold text-bpi-gold" ref={monthlyRef}>
                ₱0.00
              </p>
              <p className="text-gray-300">per month</p>
            </div>

            {/* Divider */}
            <hr className="border-t-2 border-white/10 my-4" />

            {/* Annual Cashback */}
            <div className="text-center">
              <p className="text-2xl font-bold text-white" ref={annualRef}>
                ₱0.00
              </p>
              <p className="text-gray-400">per year</p>
            </div>
          </div>
          <p className="text-bpi-gold font-semibold text-sm mt-4 h-5 block">
            {annualCapWarning}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Calculator
