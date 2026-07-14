import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'
import Register from './components/Register/Register'
import Brands from './components/Brands/Brands'
import Cart from './components/Cart/Cart'
import Notfound from './components/Notfound/Notfound'
import Products from './components/Products/Products'
import Login from './components/Login/Login'
import Categories from './components/Categories/Categories'
import UserCounterProvider from './Context/UserCounter'
import Protectedroute from './components/ProtectedRoute/Protectedroute'
import Productdetails from './components/ProductDetails/Productdetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from './../node_modules/@tanstack/react-query-devtools/src/production';
import UserContextProvider from './Context/UserContext'
import { Toaster } from 'react-hot-toast'
import Branddetail from './components/BrandDetails/Branddetail'
import Forgetpassword from './components/Forgetpassword/Forgetpassword'
function App() {
  const [count, setCount] = useState(0)
  
  let query=new QueryClient();
  console.log(query)
let x=createBrowserRouter([

  {path:'',element:<Layout/>,
  children:[

    {index:true,element:<Protectedroute><Home/></Protectedroute>},
    {path:"register",element:<Register/>},
    {path:"brands",element:<Protectedroute><Brands/></Protectedroute>},
    {path:"cart",element:<Protectedroute><Cart/></Protectedroute>},
    {path:'*',element:<Notfound/>},
    {path:'products',element:<Protectedroute><Products/></Protectedroute>},
    {path:'login',element:<Login/>},
    {path:'categories',element:<Protectedroute><Categories/></Protectedroute>},
    {path:'productdetails/:id/:category',element:<Protectedroute><Productdetails></Productdetails></Protectedroute>},
    {path:'branddetail/:id',element:<Protectedroute><Branddetail></Branddetail></Protectedroute>},
  {path:'forgetpassword',element:<Forgetpassword></Forgetpassword>} 

  ]}
])
  
  return (
    <>
    <QueryClientProvider client={query}>

      <UserCounterProvider>  
        <UserContextProvider>
  <RouterProvider router={x}/>
    <Toaster position="top-right" />

  </UserContextProvider>
  <ReactQueryDevtools></ReactQueryDevtools>
</UserCounterProvider>  
    </QueryClientProvider>
             

    </>
  )
}

export default App
