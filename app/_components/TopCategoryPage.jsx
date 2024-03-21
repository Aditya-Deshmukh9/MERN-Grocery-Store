import Image from "next/image";
import Link from "next/link";
import React from "react";

function TopCategoryPage({ categorylist }) {
  return (
    <div className="mt-5 flex justify-center gap-2 md:gap-5 mx-7 md:mx-20 overflow-auto">
      {categorylist.map((category) => (
        <Link
          href={category?.attributes?.name}
          key={category?.id}
          className="bg-green-50 flex flex-col items-center mx-2 gap-3 p-2 py-4 group hover:bg-green-600 cursor-pointer rounded-md w-[150px] min-w-[100px] scroll-auto"
        >
          <Image
            src={category.attributes.icon.data[0].attributes.url}
            alt="icon"
            height={50}
            width={50}
            className="group-hover:scale-125 transition-all ease-in-out"
          />
          <h2 className="text-sm">{category?.attributes?.name}</h2>
        </Link>
      ))}
    </div>
  );
}

export default TopCategoryPage;
