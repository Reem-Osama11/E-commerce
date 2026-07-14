import React, { createContext, useEffect, useState } from 'react'
 export let userLogin=createContext('')

export default function UserCounterProvider(props) {
 let [userloginauth,setuserloginauth]=useState(null)

useEffect(
    ()=>{
         if(localStorage.getItem('usertoken')!==null){
setuserloginauth(localStorage.getItem('usertoken'))
 }
    }
    ,[])
 
 
  return <userLogin.Provider value={{userloginauth,setuserloginauth}}>
    {props.children}
  </userLogin.Provider>


}
