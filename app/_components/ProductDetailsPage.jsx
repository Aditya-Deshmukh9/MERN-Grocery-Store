"use client";
import React, { useState } from "react";
import ImgCoursel from "./ImgCoursel";
import AddToCart from "./Products/AddToCart";
import AdjustQuantity from "./Products/AdjustQuantity";

function ProductDetailsPage({ product }) {
  const [quantity, setQuantity] = useState(1);
  const productTotalPrice = product.attributes.selling_price
    ? product.attributes.selling_price
    : product.attributes.mrp;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2 gap-x-4 p-1 md:p-2">
      <ImgCoursel
        className="h-full w-[300px]"
        img={product.attributes.images.data}
      />
      <div className="flex flex-col text-start md:text-start gap-2">
        <h2 className="text-xl font-bold ">{product.attributes.title}</h2>
        <h3 className="text-sm font-normal truncate">
          {" "}
          {product.attributes.description}
        </h3>
        <h2 className="text-2xl font-bold">
          ₹{product.attributes.selling_price}
          <span className="text-gray-400 text-sm font-normal line-through ml-1">
            MRP ₹{product.attributes.mrp}
          </span>
        </h2>
        <h3 className="font-semibold text-lg text-black">
          Quantity ({product.attributes.ItemQntyType})
        </h3>
        {/* Quantity of Products */}
        <div className="flex items-center">
          <AdjustQuantity
            quantity={quantity}
            setQuantity={setQuantity}
            productTotalPrice={productTotalPrice}
          />
        </div>

        {/* Add To cart */}
        <AddToCart
          quantity={quantity}
          product={product}
          productTotalPrice={productTotalPrice}
        />
        <h2 className="font-semibold text-sm">
          Category: {product.attributes.category.data.attributes.name}
        </h2>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
