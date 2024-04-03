"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AdjustQuantity from "../Products/AdjustQuantity";
import AddToCart from "../Products/AddToCart";
import GlobalApi from "@/app/Utils/GlobalApi";
import NotFound from "../NotFound";
import Loading from "../Loading";
import ImgCoursel from "../ImgCoursel";
import Breadcrumb from "../Breadcrumb";

function SeachDetailPage({ searchParams }) {
  const [data, setData] = useState(null);
  const [notFound, setnotFound] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (searchParams) {
      apiCall();
    }
  }, [searchParams]);

  const apiCall = async () => {
    try {
      const search = searchParams.get("query");
      await GlobalApi.getSearchDeatils(search).then((res) => setData(res));
    } catch (error) {
      setnotFound(true);
      console.error("Error fetching data:", error);
    }
  };

  if (notFound) return <NotFound />;

  if (data === null) return <Loading />;

  return (
    <>
      <Breadcrumb
        category={data && data[0].attributes.category.data.attributes.name}
        slug={data && data[0].attributes.slug}
      />

      <div className="p-4 lg:p-4 flex flex-col justify-between md:flex-row w-full">
        <div className="hidden md:inline space-y-4">
          {data &&
            data[0].attributes.images.data.map((e) => (
              <Image
                key={e.id}
                src={e.attributes.url}
                alt={e.attributes.name + " " + e.id}
                width={90}
                height={90}
                className="border rounded-sm"
              />
            ))}
        </div>
        {/* Center Coursel */}
        <div className="flex items-center justify-center">
          <ImgCoursel img={data && data[0].attributes.images.data} />
        </div>

        <div className="flex flex-col border md:w-1/2 p-5 space-y-5">
          <h1 className="text-3xl font-bold">
            {data && data[0].attributes.title}
          </h1>

          <div className="space-x-2">
            {data && data[0].attributes.description}
            <p className="font-semibold text-sm">
              Category:{" "}
              {data && data[0].attributes.category.data.attributes.name}
            </p>
          </div>

          <h3 className="font-semibold text-lg text-black">
            Quantity: {data && data[0].attributes.ItemQntyType}
          </h3>
          <hr />

          <p className="text-2xl font-bold mt-2">
            ₹{data[0].attributes.selling_price}
            <span className="text-gray-400 text-sm font-normal line-through ml-1">
              MRP ₹{data[0].attributes.mrp}
            </span>
          </p>

          {data && (
            <>
              <AdjustQuantity
                quantity={quantity}
                setQuantity={setQuantity}
                productTotalPrice={
                  data[0].attributes.selling_price
                    ? data[0].attributes.selling_price
                    : data[0].attributes.mrp
                }
              />

              {/* Add To cart */}
              <AddToCart
                quantity={quantity}
                product={data[0]}
                productTotalPrice={
                  data[0].attributes.selling_price
                    ? data[0].attributes.selling_price
                    : data[0].attributes.mrp
                }
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default SeachDetailPage;
