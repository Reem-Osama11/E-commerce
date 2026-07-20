import React, { useContext } from 'react'
import { useFormik } from 'formik'
import { UserContext } from '../../Context/UserContext'



export default function Checkout() {

 let {checkout, cartId} = useContext(UserContext)

   async function handlecheckout( cartId,url){
  let response= await checkout(cartId,url,formik.values)
console.log(response)
console.log(response.data.session.url)
if(response.data.status==="success"){
    window.location.href=response.data.session.url
}
    }

 let formik = useFormik({
     initialValues: {
        details: '',
        phone: '',
        city:''
    },
    onSubmit:()=> handlecheckout(cartId,'http://localhost:5173')
    })
  return <>
  
  <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto p-6">
    <h2 className='text-2xl mb-4'>Checkout Now :</h2>





    <div className="mb-4">
      <label htmlFor="details" className="block text-sm text-gray-600 mb-1">details :</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} id="details" type="text" value={formik.values.details} name="details" className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" placeholder="" />
    </div>





    <div className="mb-4">
      <label htmlFor="phone" className="block text-sm text-gray-600 mb-1">phone :</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} id="phone" type="tel" value={formik.values.phone} name="phone" className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" placeholder="" />
    </div>




 <div className="mb-4">
      <label htmlFor="city" className="block text-sm text-gray-600 mb-1">city :</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} id="city" type="text" value={formik.values.city} name="city" className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" placeholder="" />
    </div>



                <button className='w-full mt-3 bg-green-700 rounded-md py-2 text-white text-sm font-medium transition-colors duration-300'>Pay Naw</button>




  </form>
  
  </>
}