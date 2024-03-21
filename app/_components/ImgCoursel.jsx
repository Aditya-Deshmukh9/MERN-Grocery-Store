import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

function ImgCoursel({ img }) {
  const sortedImages = img.sort((a, b) => b.id - a.id);

  return (
    <Carousel>
      <CarouselContent>
        {sortedImages.map((image) => (
          <CarouselItem key={image.id}>
            <Image
              src={image.attributes.url}
              height={300}
              width={300}
              alt={image.attributes.name}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default ImgCoursel;
