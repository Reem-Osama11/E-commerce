import React from 'react'
import notFoundImg from '../../assets/error.svg'; // غيّر المسار ده لمكان الصورة عندك

export default function Notfound() {
  return (
  <div className="flex justify-center items-center w-full py-8">
       <img
         src={notFoundImg}
         alt="Page not found"
       />
     </div>  )
}
