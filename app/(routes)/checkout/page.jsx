"use client";
import GlobalApi from "@/app/Utils/GlobalApi";
import { useCart } from "@/app/_context/UpdateCartItems";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoveRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import Payment from "@/app/_components/payment/Payment";

function CheckoutPage() {
  const { updatecart } = useCart();
  const [login, setLogin] = useState(false);
  const [cartItemList, setcartItemList] = useState([]);
  const [totalItemInCart, setTotalItemInCart] = useState(0);
  const [subTotal, setsubTotal] = useState(0);
  const [totalPrice, settotalPrice] = useState();
  const [usdtotalPrice, setusdtotalPrice] = useState();
  const route = useRouter();
  const [userData, setuserData] = useState({
    name: "",
    email: "",
    phone: "",
    zip: "",
    address: "",
  });

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      const isLogin = token.isLogin;
      setLogin(isLogin);
      console.log("checkout", isLogin);
    }
    getCartItems(token);
    setuserData({ name: token.user.username, email: token.user.email });
  }, [updatecart]);

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      total = total + element.amount;
    });
    setsubTotal(total);
    const totalinr = total + 28 + 40;
    const totalusd = total + 28 + 40;
    settotalPrice(totalinr);
    setusdtotalPrice((totalusd * 0.012).toFixed(2));
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setuserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="w-full">
        <h2 className="text-3xl font-semibold text-center bg-primary text-white py-3">
          Checkout
        </h2>
        <div className="grid md:grid-cols-3 grid-rows-2 gap-4 md:px-6 md-p-4 p-2 px-4">
          <div className="col-span-2">
            <p>Billing Details</p>
            <div className="grid grid-cols-2 gap-4 outline-none">
              <Input
                type="text"
                name="name"
                placeholder="Name"
                value={userData.name}
                onChange={handleInputChange}
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={userData.email}
                onChange={handleInputChange}
              />
              <Input
                type="tel"
                name="phone"
                placeholder="Phone no"
                value={userData.phone}
                onChange={handleInputChange}
              />
              <Input
                type="number"
                name="zip"
                placeholder="Zip"
                value={userData.zip}
                onChange={handleInputChange}
              />
              <Input
                type="text"
                name="address"
                placeholder="Address"
                value={userData.address}
                onChange={handleInputChange}
                className="col-span-2"
              />
            </div>
          </div>
          <div className="">
            <table className="table-auto w-full border border-gray-400">
              <thead>
                <tr>
                  <th colSpan="2" className="px-4 py-2 bg-slate-200 ">
                    Cart ({totalItemInCart})
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="font-bold border-2">
                  <td className="px-4 py-2">SubTotal</td>
                  <td className="px-4 py-2 text-end">₹{subTotal}</td>
                </tr>
                <tr className="font-semibold">
                  <td className="px-4 py-2">Delivery</td>
                  <td className="px-4 py-2 text-end">₹40</td>
                </tr>
                <tr className="font-semibold">
                  <td className="px-4 py-2">GST(28%)</td>
                  <td className="px-4 py-2 text-end">₹28</td>
                </tr>
                <tr className="font-bold border-2">
                  <td className="px-4 py-2">Total</td>
                  <td className="px-4 py-2 text-end">₹{totalPrice}</td>
                </tr>
                <tr className="font-bold border-2">
                  <td className="px-4 py-2">Total(USD)</td>
                  <td className="px-4 py-2 text-end">${usdtotalPrice}</td>
                </tr>
                <tr>
                  <td colSpan="2" className="px-4 py-2">
                    {login ? (
                      <Payment
                        userData={userData}
                        totalPrice={totalPrice}
                        cartItemList={cartItemList}
                      />
                    ) : (
                      <Button
                        onClick={() => route.push("/signin")}
                        className="w-full"
                      >
                        Payment <MoveRightIcon />
                      </Button>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
    </>
  );
}

export default CheckoutPage;
