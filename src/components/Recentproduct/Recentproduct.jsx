import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useContext } from 'react'
import { UserContext } from '../../Context/UserContext';


export default function Recentproduct() {
  function getproducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["recentproduct"],
    queryFn: getproducts,
    staleTime: 5000
  });

  let { addtocart } = useContext(UserContext);

  // ⬅️ نتتبع فيها أي منتج اتضاف عشان نظهر الرسالة عليه بس
  const [addedProductId, setAddedProductId] = useState(null);

  async function addproduct(e, productId) {
    e.preventDefault();     // يمنع الـ navigate
    e.stopPropagation();    // يمنع الحدث يوصل للـ Link

    let response = await addtocart(productId);
    console.log(response);

    setAddedProductId(productId);
   
  }

  if (isLoading) {
    return <h2 className="text-center">Loading...</h2>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">

        {data?.data?.data.map((product) => (
          <Link
            to={`productdetails/${product.id}/${product.category.name}`}
            key={product._id}
            className="cursor-pointer group" // ⬅️ رجعناها هنا على كل عنصر لوحده
          >
            <img
              src={product.imageCover}
              alt={product.title}
              className="w-full h-56 object-contain mb-2"
            />

            <p className="text-xs text-green-600">{product.category.name}</p>

            <h3 className="text-sm text-gray-800 truncate">
              {product.title.split(' ').slice(0, 2).join(' ')}
            </h3>

            <div className="flex items-center justify-between mt-1">
              <span className="text-sm text-gray-700">{product.price} EGP</span>
              <span className="text-sm text-yellow-500 flex items-center gap-1">
                ★ {product.ratingsAverage}
              </span>
            </div>

            <button
              onClick={(e) => addproduct(e, product.id)}
              className={`w-full mt-3 rounded-md py-2 text-white text-sm font-medium
                opacity-0 translate-y-4
                group-hover:opacity-100 group-hover:translate-y-0
                transition-all duration-300
                ${addedProductId === product.id ? 'bg-green-700' : 'bg-green-600 hover:bg-green-700'}
              `}
            >
               Add To Cart
            </button>
          </Link>
        ))}

      </div>
    </div>
  )
}