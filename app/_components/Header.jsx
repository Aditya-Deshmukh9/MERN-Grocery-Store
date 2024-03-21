"use client";
import { LayoutGrid, Search, ShoppingBasket } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import GlobalApi from "../Utils/GlobalApi";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

function Header() {
  const [cetegoryData, setCetegoryData] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const totalItemInCart = 0;

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

  const getSignOut = () => {
    localStorage.clear();
    toast("Successfully signed out");
  };

  return (
    <div className="flex items-center justify-between p-5 shadow">
      <div className="flex gap-8">
        <Link href={"/"}>
          <Image src="/logo.webp" alt="logo" width={150} height={150} />
        </Link>
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

        <div className="md:flex hidden gap-3 items-center p-2 border-2 rounded-full">
          <Search className="ml-4" />
          <input
            type="text"
            placeholder="Search..."
            className="outline-none font-normal"
          />
        </div>
      </div>
      <div className="flex items-center gap-4 font-bold">
        <h2 className="flex items-center gap-2">
          <ShoppingBasket className="h-8 w-8 cursor-pointer" />
          <span className="bg-primary text-white px-2 font-normal text-xl rounded-full">
            {totalItemInCart}
          </span>
        </h2>
        {isLogin === false ? (
          <Link
            href="/signin"
            className="bg-primary text-white px-3 py-2 font-normal rounded-xl"
          >
            Login
          </Link>
        ) : (
          <Button onClick={() => getSignOut()}>Logout</Button>
        )}
      </div>
    </div>
  );
}

export default Header;
