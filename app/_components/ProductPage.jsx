import { Button } from "@/components/ui/button";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import ImgCoursel from "./ImgCoursel";
import ProductDetailsPage from "./ProductDetailsPage";

function ProductPage({ productsList }) {
  return (
    <div className="mt-5 items-center">
      <h2 className="text-primary font-semibold text-2xl">
        Our Popular Products
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 sm:grid-cols-3 mt-4 gap-4">
        {productsList.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center justify-center border p-3 py-6 shadow cursor-pointer hover:shadow-2xl hover:scale-105 transition-all ease-in-out"
          >
            <ImgCoursel img={product.attributes.images.data} />
            <h2 className="text-xs font-bold text-black">
              {product.attributes.title}
            </h2>
            <h2 className="text-lg font-bold">
              ₹{product.attributes.selling_price}
              <span className="text-gray-500 text-sm font-normal line-through ml-1">
                ₹{product.attributes.mrp}
              </span>
            </h2>

            <Dialog>
              <DialogTrigger asChild>
                <Button>Add To Cart</Button>
              </DialogTrigger>
              <DialogContent className="flex justify-center">
                <ProductDetailsPage product={product} />
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
