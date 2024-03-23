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
      console.log("isLogin", isLogin);
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
      const jwt = tokenpass.jwt;
      const itemId = id;
      try {
        GlobalApi.deleteCartItems(itemId, jwt).then((res) => {
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
              <SheetTitle
                className="bg-primary
                text-white font-bold text-lg p-2"
              >
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
