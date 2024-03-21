"use client";
import React, { useState } from "react";
import ImgCoursel from "./ImgCoursel";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

function ProductDetailsPage({ product }) {
  const productTotalPrice = product.attributes.selling_price
    ? product.attributes.selling_price
    : product.attributes.mrp;

  const [quantity, setQuantity] = useState(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:p-2 content-center py-4">
      <ImgCoursel img={product.attributes.images.data} />
      <div className="flex flex-col items-start gap-2">
        <h2 className="text-xl font-bold "> {product.attributes.title}</h2>
        <h3 className="text-sm font-normal">
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
        <div className="flex items-center">
          <div className="p-2 flex border gap-10 items-center px-5">
            <button
              disabled={quantity === 1}
              onClick={() => setQuantity(quantity - 1)}
            >
              <Minus />
            </button>
            <h2>{quantity}</h2>
            <button
              disabled={quantity === 10}
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus />
            </button>
          </div>
          <h2 className="text-2xl font-bold">
            = ₹{productTotalPrice * quantity}
          </h2>
        </div>
        <Button>
          {/* {isLoading === true ? (
            <Loader className="animate-spin" />
          ) : (
            "Add To Cart"
          )} */}
          Add To Cart
        </Button>
        <h2 className="font-semibold text-sm">
          Category: {product.attributes.category.data.attributes.name}
        </h2>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
