"use client";
import SeachDetailspage from "@/app/(routes)/search/page";
import GlobalApi from "@/app/Utils/GlobalApi";
import {
  DrawerClose,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

function SearchProducts() {
  const [query, setQuery] = useState("");
  const [searchData, setsearchData] = useState(null);
  const drawerRef = useRef(null);
  const route = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (query) {
      GlobalApi.getSearchProducts(query).then((res) => setsearchData(res));
    }
  };

  const handleLinkClick = (slug) => {
    if (drawerRef.current) {
      drawerRef.current.click();
    }
    route.push("/search?query=" + slug);
  };

  return (
    <>
      <DrawerHeader>
        <DrawerTitle>
          {" "}
          <form
            onSubmit={handleSubmit}
            className="flex gap-y-3 p-1 md:p-2 items-center w-full border border-black rounded-full"
          >
            <button type="submit" className="ml-2 m-2 md:ml-4">
              <Search className=" hover:text-gray-400 " />
            </button>
            <input
              type="text"
              autoFocus
              autoComplete="true"
              placeholder="Search..."
              className="outline-none border-black w-full font-normal"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </DrawerTitle>
        <DrawerDescription className="h-full w-full flex justify-center">
          {searchData && (
            <div className="max-w-xs md:max-w-4xl rounded-lg border bg-white p-4 shadow-md md:p-8 dark:border-gray-700 dark:bg-gray-800">
              <div className="flow-root">
                <ul
                  role="list"
                  className="divide-y divide-gray-200 dark:divide-gray-700"
                >
                  {searchData.map((e, index) => (
                    <li key={index} className="py-3 sm:py-4">
                      <div
                        onClick={() => handleLinkClick(e.attributes.slug)}
                        className="flex items-center cursor-pointer space-x-4"
                      >
                        <div className="flex-shrink-0">
                          <Image
                            src={e.attributes.images.data[0].attributes.url}
                            alt="icon"
                            height={100}
                            width={100}
                            className="h-10 w-10 md:h-20 md:w-20"
                          />
                        </div>
                        <div className="min-w-0 flex-1 text-left">
                          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                            {e.attributes.title}
                          </p>
                          <p className="truncate text-xs font-normal text-gray-500 dark:text-gray-400">
                            {e.attributes.description}
                          </p>
                          <p className="text-xs font-normal">
                            Category:{" "}
                            <span className="font-semibold">
                              {e.attributes.category.data.attributes.name}
                            </span>
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          ₹ {e.attributes.selling_price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <DrawerClose ref={drawerRef} />
            </div>
          )}
        </DrawerDescription>
      </DrawerHeader>
    </>
  );
}
export default SearchProducts;
