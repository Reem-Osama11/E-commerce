import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'

export default function Allorders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function getOrders() {
      try {
        const token = localStorage.getItem('usertoken')

        if (!token) {
          setError('Please log in first')
          setLoading(false)
          return
        }

        const decoded = jwtDecode(token)
        const userId = decoded.id

        const { data } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
        )
        setOrders(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    getOrders()
  }, [])

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )

  if (error)
    return (
      <div className="text-center text-red-600 font-semibold mt-10">
        {error}
      </div>
    )

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-1">My Orders</h2>
      <p className="text-gray-500 mb-8">
        {orders.length} {orders.length === 1 ? 'order' : 'orders'} placed
      </p>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg">You have no orders yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order, index) => (
            <div
              key={order._id}
              className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400 font-medium mb-1">
                    Order #{index + 1}
                  </p>
                  <p className="font-mono text-xs text-gray-500">
                    {order._id}
                  </p>
                </div>

                <span
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                    order.paymentMethodType === 'card'
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'bg-amber-50 text-amber-600'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      order.paymentMethodType === 'card'
                        ? 'bg-indigo-500'
                        : 'bg-amber-500'
                    }`}
                  ></span>
                  {order.paymentMethodType === 'card' ? 'Card' : 'Cash'}
                </span>
              </div>

              <div className="flex justify-between items-end mt-5 pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">Total Amount</span>
                <span className="text-2xl font-bold text-emerald-600">
                  ${order.totalOrderPrice}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}