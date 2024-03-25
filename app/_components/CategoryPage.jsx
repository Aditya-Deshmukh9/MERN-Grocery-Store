import Image from "next/image";
import Link from "next/link";
import React from "react";

function CategoryPage({ categorylist }) {
  return (
    <div className="mt-5">
      <h2 className="text-primary font-semibold text-2xl">Shop by Category</h2>
      <div className="mt-5 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7">
        {categorylist.map((category) => (
          <Link
            href={"products-category/" + category?.attributes?.slug}
            key={category?.id}
            className="bg-green-50 flex flex-col items-center m-2 gap-3 p-2 py-4 group hover:bg-green-600 cursor-pointer rounded-md"
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
    </div>
  );
}

export default CategoryPage;
