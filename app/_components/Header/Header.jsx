"use client";
import { Search, ShoppingBasket } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import GlobalApi from "@/app/Utils/GlobalApi";
import { Button } from "@/components/ui/button";
import DropDownMenu from "./DropDownMenu";
import { useCart } from "@/app/_context/UpdateCartItems";

function Header() {
  const [login, setLogin] = useState(true);
  const [totalItemInCart, setTotalItemInCart] = useState(0);
  const { updatecart, setupdatecart } = useCart();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      const isLogin = token.isLogin;
      setLogin(isLogin);
      console.log("isLogin", isLogin);
    }
    getCartItems(token);
  }, [updatecart]);

  const getCartItems = async (token) => {
    if (token === null) {
      setTotalItemInCart(0);
      return;
    }
    if (token) {
      const jwt = token.jwt;
      const userid = token.user.id;
      try {
        const cartItemList = await GlobalApi.getCartItem(userid, jwt);
        setTotalItemInCart(cartItemList.length);
      } catch (error) {
        console.log(error);
        setTotalItemInCart(0);
      }
    }
  };

  const getSignOut = () => {
    localStorage.clear();
    setLogin(false);
    setupdatecart(null);
    toast("Successfully signed out");
  };

  return (
    <div className="flex items-center justify-between p-5 shadow">
      <div className="flex gap-8">
        <Link href={"/"}>
          <Image src="/logo.webp" alt="logo" width={150} height={150} />
        </Link>
        <DropDownMenu />

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
        <Sheet>
          <SheetTrigger>
            <h2 className="flex items-center gap-2">
              <ShoppingBasket className="h-8 w-8 cursor-pointer" />
              <span className="bg-primary text-white px-2 font-normal text-xl rounded-full">
                {totalItemInCart}
              </span>
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        {login === true ? (
          <Button onClick={() => getSignOut()}>Logout</Button>
        ) : (
          <Link
            href="/signin"
            className="bg-primary text-white px-3 py-2 font-normal rounded-xl"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
