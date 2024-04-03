"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalApi from "@/app/Utils/GlobalApi";
import { LayoutGrid } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

function DropDownMenu() {
  const [cetegoryData, setCetegoryData] = useState([]);
  const params = useParams();

  useEffect(() => {
    getCetegory();
  }, []);

  const getCetegory = () => {
    try {
      GlobalApi.getCetegory().then((res) => {
        setCetegoryData(res.data.data);
      });
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  return (
    <DropdownMenu className="outline-none">
      <DropdownMenuTrigger asChild>
        <h1 className="md:flex hidden items-center gap-2 font-normal p-2 px-10 border text-white   bg-primary rounded-full">
          <LayoutGrid className="h-5 w-5" />
          Category
        </h1>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Browse Catagory</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {cetegoryData.map((category) => (
          <DropdownMenuItem
            className="flex items-center cursor-pointer"
            key={category?.id}
          >
            <Link
              className="flex gap-2 items-center"
              href={
                Object.keys(params).length === 0
                  ? `products-category/${category?.attributes?.slug}`
                  : category?.attributes?.slug
              }
            >
              <Image
                src={category.attributes.icon.data[0].attributes.url}
                alt="icon"
                height={28}
                width={28}
              />
              <p className="text-sm capitalize">{category?.attributes?.name}</p>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropDownMenu;
