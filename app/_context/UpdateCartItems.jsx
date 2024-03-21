"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const cartContext = createContext(null);

const MyContextProvider = ({ children }) => {
  const [updateCart, setUpdateCart] = useState(false);
  const [userData, setUserData] = useState({ user: null, jwt: null });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    setUserData({ user, jwt });
    if (user && jwt) {
      setUpdateCart(false);
    }
  }, [updateCart]);

  return (
    <cartContext.Provider
      value={{ updateCart, setUserData, setUpdateCart, userData }}
    >
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => useContext(cartContext);

export default MyContextProvider;
