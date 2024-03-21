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

function DropDownMenu() {
  const [cetegoryData, setCetegoryData] = useState([]);

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
        <h1 className="md:flex hidden items-center gap-2 font-bold p-2 px-10 border bg-slate-200 rounded-full">
          <LayoutGrid className="h-5 w-5" />
          Category
        </h1>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Browse Catagory</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {cetegoryData.map((category) => (
          <DropdownMenuItem
            className="flex gap-2 items-center cursor-pointer"
            key={category?.id}
          >
            <Image
              src={category.attributes.icon.data[0].attributes.url}
              alt="icon"
              height={28}
              width={28}
            />
            <Link
              href={"products-category/" + category?.attributes?.name}
              className="text-sm"
            >
              {category?.attributes?.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropDownMenu;
