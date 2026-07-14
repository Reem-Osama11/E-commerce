import axios from 'axios';
import React, { useEffect ,useState } from 'react'
import { Link } from 'react-router-dom';
export default function Brands() {
  const [brands, setBrands] = useState([]);

  function getBrands(){
    axios.get('https://ecommerce.routemisr.com/api/v1/brands').then((response)=>{
      console.log(response)
       setBrands(response.data.data);

    })
    .catch((error)=>{
      console.log(error)
    })
  }




 useEffect(() => {
    getBrands();
  }, []);


  return <>
   <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-center mb-8">All Brands</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <Link
            to={`/branddetail/${brand._id}`}
              key={brand._id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer block"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-40 object-contain p-4"
              />
              <div className="text-center py-3 border-t">
                <p className="font-medium text-gray-700">{brand.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
  </>
}
