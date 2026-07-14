import React, { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('');

  function handleShare(e) {
    e.preventDefault()
    console.log('Sharing app link to:', email);
    // هنا تحط الـ logic بتاعك (API call أو أي حاجة)
  }

  return (
    <>
      <div className="bg-gray-100 pb-16">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h3 className="text-xl text-gray-800 mb-1">Get the FreshCart app</h3>
          <p className="text-sm text-gray-500 mb-4">
            We will send you a link, open it on your phone to download the app.
          </p>

          <form
            onSubmit={handleShare}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email .."
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-6 py-2 rounded-md transition-colors whitespace-nowrap"
            >
              Share App Link
            </button>
          </form>

          <hr className="border-gray-200 mb-4" />

          <div className="flex flex-col gap-6">
            {/* Payment Partners */}
<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
  <span className="text-sm text-gray-700 whitespace-nowrap">Payment Partners</span>
  <div className="flex flex-wrap items-center gap-3">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/2/29/Amazon_Pay_logo.svg"
      alt="Amazon Pay"
      className="h-4 object-contain"
    />
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg"
      alt="American Express"
      className="h-6 object-contain"
    />
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
      alt="Mastercard"
      className="h-6 object-contain"
    />
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
      alt="PayPal"
      className="h-5 object-contain"
    />
  </div>
</div>

            {/* App Store / Google Play */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <span className="text-sm text-gray-700 whitespace-nowrap">Get deliveries with FreshCart</span>
              <div className="flex flex-wrap items-center gap-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="Download on the App Store"
                  className="h-9 object-contain"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-9 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-16"></div>
    </>
  )
}