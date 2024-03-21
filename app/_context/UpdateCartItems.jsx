"use client";
import React, { createContext, useContext, useState } from "react";

const cartContext = createContext(null);

const MyContextProvider = ({ children }) => {
  const [updatecart, setupdatecart] = useState(null);

  return (
    <cartContext.Provider
      value={{
        updatecart,
        setupdatecart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => useContext(cartContext);

export default MyContextProvider;
