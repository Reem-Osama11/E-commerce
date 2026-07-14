import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
export let UserContext = createContext();

export default function UserContextProvider(props) {
  let [cartCount, setCartCount] = useState(0);

  let headers = {
    token: localStorage.getItem("usertoken"),
  };

  function updateCartCount(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
        { count },
        { headers }
      )
      .then((response) => {
        console.log(response);
        setCartCount(response.data.numOfCartItems);
        return response;
      })
      .catch((error) => {
        console.log(error.response?.data);
        return error;
      });
  }

  function getcartitems() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v2/cart", { headers })
      .then((response) => {
        console.log(response);
        setCartCount(response.data.numOfCartItems);
        return response;
      })
      .catch((error) => error);
  }

  function removeitems(prodctid) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v2/cart/${prodctid}`, { headers })
      .then((response) => {
        console.log(response);
        setCartCount(response.data.numOfCartItems);
        return response;
      })
      .catch((error) => {
        console.log(error.response?.data);
        return error;
      });
  }

  function addtocart(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v2/cart",
        { productId },
        { headers }
      )
      .then((response) => {
        toast.success(response.data.message);
        setCartCount(response.data.numOfCartItems);
        return response;
      })
      .catch((error) => {
        toast.error("حدث خطأ أثناء الإضافة");
        return error;
      });
  }

  useEffect(() => {
    if (localStorage.getItem("usertoken")) {
      getcartitems();
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ addtocart, getcartitems, removeitems, updateCartCount, cartCount, setCartCount }}
    >
      {props.children}
    </UserContext.Provider>
  );
}