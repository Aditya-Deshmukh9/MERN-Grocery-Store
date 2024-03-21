import Image from "next/image";
import React from "react";

function Banner() {
  return (
    <Image
      src="https://res.cloudinary.com/dxo5lxx5e/image/upload/v1710847183/banner_ec86ee84fb.png"
      height={1000}
      width={1000}
      alt="Bannner"
      className="h-full w-full mt-5"
    />
  );
}

export default Banner;
