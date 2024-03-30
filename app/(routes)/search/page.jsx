"use client";
import GlobalApi from "@/app/Utils/GlobalApi";
import NotFound from "@/app/_components/NotFound";
import AddToCart from "@/app/_components/Products/AddToCart";
import AdjustQuantity from "@/app/_components/Products/AdjustQuantity";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Loader, MoveLeft } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function SeachDetailspage() {
  const [data, setData] = useState(null);
  const [notFound, setnotFound] = useState(false);
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    apiCall();
  }, []);

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

  if (data === null) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader className="animate-spin" size={50} />
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-4 flex flex-col md:flex-row w-full">
      <div className="hidden md:inline space-y-4">
        {data &&
          data.map((e, index) => (
            <Image
              key={index}
              src={e.attributes.images.data[0].attributes.url}
              alt={e.attributes.images.data[0].attributes.name + " " + index}
              width={90}
              height={90}
              className="border rounded-sm"
            />
          ))}
      </div>
      <Carousel
        opts={{
          loop: true,
        }}
        className="w-4/5 mb-10 lg:mb-0 lg:w-full self-start flex items-center max-w-xl mx-auto lg:mx-20"
      >
        <CarouselContent>
          {data &&
            data.map((e, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <div className="flex aspect-square items-center justify-center p-2 relative">
                    <Image
                      key={index}
                      src={e.attributes.images.data[0].attributes.url}
                      alt={
                        e.attributes.images.data[0].attributes.name +
                        " " +
                        index
                      }
                      width={400}
                      height={400}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="flex-1 border w-full p-5 space-y-5">
        <h1 className="text-3xl font-bold">
          {data && data[0].attributes.title}
        </h1>

        <div className="space-x-2">
          {data && data[0].attributes.description}
        </div>
        <hr />

        <p className="text-2xl font-bold mt-2">
          ₹{data[0].attributes.selling_price}
          <span className="text-gray-400 text-sm font-normal line-through ml-1">
            MRP ₹{data[0].attributes.mrp}
          </span>
        </p>
        {/* <AddToCart product={product} /> */}
        {data && (
          <>
            <AdjustQuantity quantity={quantity} setQuantity={setQuantity} />
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
  );
}

export default SeachDetailspage;
