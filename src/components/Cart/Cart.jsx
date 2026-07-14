import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Context/UserContext';

export default function Cart() {
  let { getcartitems , removeitems , updateCartCount } = useContext(UserContext);
  const [cart, setCart] = useState(null);

   async function fetchCart() {
  let response = await getcartitems();

  console.log(response);

  if (response?.data) {
    setCart(response.data.data);
  }
}
async function removeCart(productId) {
  let response = await removeitems(productId);
  console.log(response);

  if (response?.data?.status === 'success') {
  setCart(response.data.data);
  }
}

async function updateitems(productId,count) {
  let response = await updateCartCount(productId,count);

  console.log(response);
  if (response?.data?.status === 'success') {   // ✅ نتأكد الأول قبل ما نستخدم الداتا
    setCart(response.data.data);

    }
  }


  useEffect(() => {
    fetchCart();
  }, []);

  return<>
         <div className="max-w-5xl mx-auto p-4 md:p-8">
        {cart && cart.products?.length > 0 && (
          <>
            {/* ====== نسخة الموبايل - كروت ====== */}
            <div className="md:hidden bg-white shadow-sm rounded-xl border border-gray-100 divide-y divide-gray-100">
              {cart.products.map((item) => (
                <div key={item.product._id} className="flex items-center gap-3 p-4">
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-14 h-14 object-cover rounded-lg border border-gray-100 flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">
                      {item.product.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.price * item.count} EGP
                    </p>
                    <button
                      onClick={() => removeCart(item.product._id)}
                      className="text-xs font-medium text-red-500 hover:text-red-600 mt-1"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => updateitems(item.product._id, item.count - 1)}
                      className="flex items-center justify-center w-7 h-7 rounded-full border border-gray-200 text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14" />
                      </svg>
                    </button>

                    <span className="w-5 text-center font-medium text-gray-900 text-sm">
                      {item.count}
                    </span>

                    <button
                      type="button"
                      onClick={() => updateitems(item.product._id, item.count + 1)}
                      className="flex items-center justify-center w-7 h-7 rounded-full border border-gray-200 text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ====== نسخة الشاشات الكبيرة - جدول ====== */}
            <div className="hidden md:block relative overflow-x-auto bg-white shadow-sm rounded-xl border border-gray-100">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-sm text-gray-500 bg-gray-50/80 border-b border-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-medium">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-4 font-medium">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-4 font-medium text-center">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-4 font-medium">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-4 font-medium">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {cart.products.map((item) => (
                    <tr
                      key={item.product._id}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50/60 transition-colors"
                    >
                      <td className="p-4">
                        <img
                          src={item.product.imageCover}
                          alt={item.product.title}
                          className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg border border-gray-100"
                        />
                      </td>

                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {item.product.title}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            type="button"
                            onClick={() => updateitems(item.product._id, item.count - 1)}
                            className="flex items-center justify-center w-7 h-7 rounded-full border border-gray-200 text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
                          >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14" />
                            </svg>
                          </button>

                          <span className="w-6 text-center font-medium text-gray-900">
                            {item.count}
                          </span>

                          <button
                            type="button"
                            onClick={() => updateitems(item.product._id, item.count + 1)}
                            className="flex items-center justify-center w-7 h-7 rounded-full border border-gray-200 text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
                          >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                            </svg>
                          </button>
                        </div>
                      </td>

                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {item.price * item.count} EGP
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            console.log("item._id =", item._id);
                            console.log("product._id =", item.product._id);
                            removeCart(item.product._id);
                          }}
                          className="font-medium text-red-500 hover:text-red-600 hover:underline transition-colors"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {cart && cart.products?.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            Your cart is empty.
          </div>
        )}
      </div>
   
  </>
}
