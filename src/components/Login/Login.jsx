import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import values from './../../../node_modules/lodash-es/values';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { userLogin } from '../../Context/UserCounter';
import { UserContext } from '../../Context/UserContext';   // ⬅️ جديد

export default function Login() {
    let navigate = useNavigate();

  let [errorApi, setErrorApi] = useState('');
  let [loading, setLoading] = useState(false);
  const { userloginauth, setuserloginauth } = useContext(userLogin);
  let { getcartitems } = useContext(UserContext);   // ⬅️ جديد

async function handlelogin(values) {
  setLoading(true);
  console.log(values);

    let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
    .then ((response) => {
      setLoading(false);
      console.log(response);
      console.log(response.data.token)
      setuserloginauth(response.data.token)
      localStorage.setItem("usertoken", response.data.token)

      getcartitems();   // ⬅️ جديد: يجيب عدد المنتجات فور نجاح الـ login

      navigate('/');
      })
     .catch((error) => {
       setLoading(false);
       console.dir(error);
       console.log(error.response.data.message);
       setErrorApi(error.response.data.message);
    });
    }

let yupvalidation = Yup.object().shape({
  email: Yup.string().required('email is required').email('Invalid email address'),
  password: Yup.string().required('password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must be at least 8 characters long and contain at least one letter and one number'),
})

    let formik = useFormik({
     initialValues: {
        email: '',
        password: '',
    },
     validationSchema: yupvalidation,
    onSubmit: handlelogin,
    })


  return <>

  <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto p-6">
    <h2 className='text-2xl mb-4'>Login Now :</h2>


  {errorApi ? <div className="bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-500/20 dark:border-red-900 dark:text-red-400" role="alert" tabIndex="-1" aria-labelledby="hs-soft-color-danger-label">
    Incorrect email or password</div> : null}



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



   <div className="flex justify-end">
    <button type="submit" className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-6 py-2 rounded-md focus:outline-none flex items-center gap-2">
     {loading ?   <i className="fa-solid fa-spinner animate-spin"></i>:"Login" }

    </button>
  </div>
  <span>Don't have an account? <Link to='/register'>Sign up</Link></span>
<Link  to='/forgetpassword'> forget password</Link>
  </form>
  </>
}
