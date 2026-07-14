import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { useContext } from 'react'
import { UserContext } from '../../Context/UserContext';

export default function Productdetails() {
  const { id, category } = useParams();

  const [productDetails, setProductDetails] = useState(null);
  const [productRelated, setProductRelated] = useState([]);
  let { addtocart } = useContext(UserContext);

 const [addedProductId, setAddedProductId] = useState(null);
 
   async function addproduct(e, productId) {
     e.preventDefault();     // يمنع الـ navigate
     e.stopPropagation();    // يمنع الحدث يوصل للـ Link
 
     let response = await addtocart(productId);
     console.log(response);
 
     setAddedProductId(productId);
    
   }

  function getdetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((response) => {
        setProductDetails(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getrelated(category) {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((response) => {
        let allproducts = response.data.data;

        let related = allproducts.filter(
          (product) => product.category.name === category
        );

        setProductRelated(related);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getdetails(id);
    getrelated(category);
  }, [id, category]);
  return (
    <>
      {productDetails ? (
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex flex-col md:flex-row gap-8 items-center">

           <div className="w-full md:w-1/3">

 <Swiper
  modules={[Pagination]}
  pagination={{ clickable: true }}
  spaceBetween={20}
  slidesPerView={1}
  grabCursor={true}
  className="product-swiper"

>
    {productDetails.images.map((image, index) => (
      <SwiperSlide key={index}>
        <img
          src={image}
          alt={productDetails.title}
          className="w-full h-96 object-contain"
        />
      </SwiperSlide>
    ))}
  </Swiper>

</div>

            {/* Product Info */}
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-semibold">
                {productDetails.title}
              </h2>

              <p className="text-gray-500 mt-3">
                {productDetails.description}
              </p>

              <p className="text-green-600 mt-4">
                {productDetails.category.name}
              </p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-semibold">
                  {productDetails.price} EGP
                </span>

                <span className="text-yellow-500">
                  ⭐ {productDetails.ratingsAverage}
                </span>
              </div>

              <button   onClick={(e) => addproduct(e, productDetails.id)}

              className="w-full bg-green-500 hover:bg-green-600 text-white rounded-md py-3 mt-6">
                + Add To Cart
              </button>
            </div>

          </div>
        </div>
      ) : (
        <p className="text-center text-xl p-10">Loading...</p>
      )}

      {/* Related Products */}

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">
          Related Products
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {productRelated.map((product) => (
            <Link
              key={product._id}
              to={`/productdetails/${product.id}/${product.category.name}`}
            >
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-full h-40 object-contain"
              />

              <p className="text-green-600 text-sm mt-2">
                {product.category.name}
              </p>

              <h3 className="font-medium text-sm">
                {product.title.split(" ").slice(0, 2).join(" ")}
              </h3>

              <div className="flex justify-between mt-2">
                <span>{product.price} EGP</span>

                <span className="text-yellow-500">
                  ⭐ {product.ratingsAverage}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}