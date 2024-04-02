"use client";
import { Search, ShoppingBasket } from "lucide-react";
import {
  Sheet,
  SheetClose,
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
import { Button } from "@/components/ui/button";
import DropDownMenu from "./DropDownMenu";
import { useCart } from "@/app/_context/UpdateCartItems";
import CartItemList from "./CartItemList";
import { useRouter } from "next/navigation";
import GlobalApi from "@/app/Utils/GlobalApi";
import Profile from "./Profile";
import SearchProducts from "./SearchProducts";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";

function Header() {
  const [login, setLogin] = useState();
  const [totalItemInCart, setTotalItemInCart] = useState(0);
  const { updatecart, setupdatecart } = useCart();
  const [cartItemList, setcartItemList] = useState([]);
  const [tokenpass, settokenpass] = useState();
  const [subTotal, setsubTotal] = useState(0);
  const route = useRouter();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      const isLogin = token.isLogin;
      setLogin(isLogin);
    }
    getCartItems(token);
    settokenpass(token);
  }, [updatecart]);

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      total = total + element.amount;
    });
    setsubTotal(total);
  }, [cartItemList]);

  const getCartItems = async (token) => {
    if (token === null) {
      setTotalItemInCart(0);
      return;
    }
    if (token) {
      const jwt = token.jwt;
      const userid = token.user.id;
      try {
        const cartItemList_ = await GlobalApi.getCartItem(userid, jwt);
        setTotalItemInCart(cartItemList_.length);
        setcartItemList(cartItemList_);
      } catch (error) {
        console.log(error);
        setTotalItemInCart(0);
      }
    }
  };

  const onDelItem = async (id) => {
    if (tokenpass) {
      toast("Loading...");
      const jwt = tokenpass.jwt;
      const itemId = id;
      try {
        GlobalApi.deleteCartItems(itemId, jwt).then(() => {
          getCartItems(tokenpass);
          toast("Product Remove Successful");
        });
      } catch (error) {
        toast("Error deleting item");
        console.log("Error deleting item");
      }
    }
  };

  const getSignOut = () => {
    localStorage.clear();
    getCartItems(tokenpass);
    setLogin(false);
    setupdatecart(null);
    toast("Successfully signed out");
  };

  return (
    <div className="flex items-center justify-between p-3  md:p-5 shadow">
      <div className="flex gap-8 items-center">
        <Link href="/">
          <Image src="/logo.webp" alt="Logo" width={150} height={150} />
        </Link>
        <DropDownMenu />
      </div>
      <div className="flex items-center md:gap-4 gap-2  font-bold">
        {/* Search Box  */}
        <Drawer>
          <DrawerTrigger>
            <Search className="h-6 w-6 md:h-8 md:w-8" />
          </DrawerTrigger>
          <DrawerContent className="h-full">
            <SearchProducts />
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <Sheet>
          <SheetTrigger>
            <h2 className="flex items-center md:gap-2 gap-1 cursor-pointer">
              <ShoppingBasket className="h-6 w-6 md:h-8 md:w-8" />
              <span className="bg-primary text-white h-6 w-6 md:h-8 md:w-8 md:p-1 font-normal text-xl rounded-full">
                {totalItemInCart}
              </span>
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="bg-primary text-white font-bold text-lg p-2">
                My Cart ({totalItemInCart})
              </SheetTitle>
              <SheetDescription>
                <CartItemList data={cartItemList} onDelItem={onDelItem} />
              </SheetDescription>
            </SheetHeader>
            <SheetClose>
              <div className="w-[90%] absolute bottom-6 flex flex-col">
                <h2 className="text-lg font-semibold text-gray-700 flex justify-between">
                  Subtotal: <span>₹{subTotal}</span>
                </h2>
                <Button
                  onClick={() =>
                    route.push(tokenpass ? "/checkout" : "/signin")
                  }
                >
                  Checkout
                </Button>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>
        {login === true ? (
          <>
            <Profile getSignOut={getSignOut} />
          </>
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
