import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

function Slider({ sliderlist }) {
  return (
    <Carousel>
      <CarouselContent>
        {sliderlist.map((slider) => (
          <CarouselItem key={slider?.id}>
            <Image
              src={slider?.attributes?.img?.data[0]?.attributes?.url}
              unoptimized={true}
              height={1000}
              width={1000}
              alt="slider"
              className="h-full md:h-[450px] w-full bg-blue-800 rounded-2xl object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default Slider;
