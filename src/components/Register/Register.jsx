import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import values from './../../../node_modules/lodash-es/values';
import axios from 'axios';
import { Link, NavLink, useNavigate } from 'react-router-dom';
 import * as Yup from 'yup';
import { userLogin } from '../../Context/UserCounter';

export default function Register() {
    let navigate= useNavigate();

  let [errorApi, setErrorApi] = useState('');
  let [loading, setLoading] = useState(false);
let {setuserloginauth}=useContext(userLogin)

async function handleregister(values) {
  setLoading(true);
  console.log(values);

    let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
    .then ((response) => {
       setLoading(false);
       console.log(response);
       console.log(response.data.token)
        setuserloginauth(response.data.token)
        localStorage.setItem("usertoken",response.data.token)
       navigate('/');
      })
     .catch((error) => {    setLoading(false);
       console.dir(error);


      // console.log(error.response.data.message);
      setErrorApi(error.response.data.message);
    
    });   
    }
  

//  function myvalidation(values){


//   let errors={};
//    if(values.name==='' ){
//     errors.name='name is required';
//    }
//    else if(!/^[a-zA-Z\u0600-\u06FF\s]{3,20}$/.test(values.name)){
//     errors.name="Name must be 3-20 letters only (no numbers or symbols)";

//    }

//    if(values.email==='' ){
//     errors.email='email is required';
//    }
//    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
//     errors.email="Invalid email address";
//  }
//   if(values.phone==='' ){
//     errors.phone='phone is required';
//    }
//    else if(!/^(010|011|012|015)[0-9]{8}$/.test(values.phone)){
//     errors.phone="Invalid phone number";
//    }
//    if(values.password==='' ){
//     errors.password='password is required';
//    }
//     else if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)){ 
//       errors.password="Password must be at least 8 characters long and contain at least one letter and one number";

//     }
//     if(values.rePassword==='' ){
//       errors.rePassword='rePassword is required';
//      }
//      else if(values.rePassword!==values.password){
//       errors.rePassword="Passwords do not match";
//      }
//     return errors;
//     }
    
let yupvalidation=Yup.object().shape({
name:Yup.string().required('name is required').matches(/^[a-zA-Z\u0600-\u06FF\s]{3,20}$/,'Name must be 3-20 letters only (no numbers or symbols)'),
email:Yup.string().required('email is required').email('Invalid email address'),
phone:Yup.string().required('phone is required').matches(/^(010|011|012|015)[0-9]{8}$/, 'Invalid phone number'),
password:Yup.string().required('password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must be at least 8 characters long and contain at least one letter and one number'),
rePassword:Yup.string().required('rePassword is required').oneOf([Yup.ref('password')], 'Passwords do not match')

})
    let formik=useFormik({

     initialValues:{
        name:'',
        phone:'',
        email:'',
        password:'',
        rePassword:''
    },
        // validate:myvalidation,
     validationSchema:yupvalidation,
    onSubmit:handleregister,
    })


    

  return <>
 

<form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto p-6">
  <h2 className='text-2xl mb-4'>Register Now :</h2>


{errorApi? <div class="bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-500/20 dark:border-red-900 dark:text-red-400" role="alert" tabindex="-1" aria-labelledby="hs-soft-color-danger-label">
  Account Already Exists</div> : null}


  <div className="mb-4">
    <label htmlFor="name" className="block text-sm text-gray-600 mb-1">name :</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} id="name" type="text" value={formik.values.name} name="name" className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" placeholder="" />
  </div>

   {formik.errors.name && formik.touched.name ? <div className="p-4 mb-4 text-sm text-red-700 rounded-md bg-red-100" role="alert">  {formik.errors.name}</div> : null}

  <div className="mb-4">
    <label htmlFor="email" className="block text-sm text-gray-600 mb-1">email :</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} id="email" type="email" value={formik.values.email} name="email" className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" placeholder="" />
  </div>


    {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-700 rounded-md bg-red-100" role="alert">{formik.errors.email}</div> : null}

  

  <div className="mb-4">
    <label htmlFor="password" className="block text-sm text-gray-600 mb-1">password :</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} id="password" type="password" value={formik.values.password} name="password" className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" placeholder="" />
  </div>


    {formik.errors.password && formik.touched.password ?
     <div className="p-4 mb-4 text-sm text-red-700 rounded-md bg-red-100" role="alert">{formik.errors.password}</div> : null}

  <div className="mb-4">
    <label htmlFor="rePassword" className="block text-sm text-gray-600 mb-1">rePassword :</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} id="rePassword" type="password" value={formik.values.rePassword} name="rePassword" className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" placeholder="" />
  </div>


    {formik.errors.rePassword && formik.touched.rePassword ? <div className="p-4 mb-4 text-sm text-red-700 rounded-md bg-red-100" role="alert">{formik.errors.rePassword}</div> : null}

  <div className="mb-6">
    <label htmlFor="phone" className="block text-sm text-gray-600 mb-1">phone :</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} id="phone" type="text" value={formik.values.phone} name="phone" className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" placeholder="" />
  </div>


    {formik.errors.phone && formik.touched.phone ? <div className="p-4 mb-4 text-sm text-red-700 rounded-md bg-red-100" role="alert">{formik.errors.phone}</div> : null}

 <div className="flex justify-end">
  <button type="submit" className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-6 py-2 rounded-md focus:outline-none flex items-center gap-2">
   {loading ?   <i className="fa-solid fa-spinner"></i>:"Register" }
    
  </button>
</div>

<p> Already have account? <Link to='/login' >Login </Link></p>
</form>


  




  </>
}

