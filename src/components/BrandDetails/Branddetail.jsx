import axios from 'axios'
import React, { useEffect , useState } from 'react'
import { useParams } from "react-router-dom";
export default function Branddetail() {
        const { id } = useParams();
  const [brand, setBrand] = useState(null);

   function detailsbrand(id){
        axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`).then((response)=>{
            console.log(response)
                    setBrand(response.data.data);

        }).catch((error)=>{
            console.log(error)
        })
   }



   useEffect(()=>{
detailsbrand(id)
   },[id])

  return <>
  
  
<div className="min-h-[80vh] bg-gray-50 flex items-center justify-center px-4 py-10">
      {brand && (
        <div className="max-w-sm w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="bg-gradient-to-b from-gray-50 to-white p-8 flex items-center justify-center">
            <img
              src={brand.image}
              alt={brand.name}
              className="w-48 h-48 object-contain drop-shadow-sm"
            />
          </div>

          <div className="border-t border-gray-100 py-6 px-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
              {brand.name}
            </h2>
            <p className="text-sm text-gray-400 mt-1">Official Brand</p>
          </div>
        </div>
      )}
    </div>
  
  </>
}
