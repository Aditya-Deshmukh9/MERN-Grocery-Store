import GlobalApi from "@/app/Utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { MoveRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

function payment({ userData, totalPrice, cartItemList }) {
  const route = useRouter();

  const placeOrder = () => {
    if (
      userData.name === "" ||
      userData.address === "" ||
      userData.email === "" ||
      userData.phone === "" ||
      userData.zip === ""
    ) {
      toast("All fields are required");
      return false;
    }

    const addressInfo = {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      zip: userData.zip,
      address: userData.address,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    const token = JSON.parse(localStorage.getItem("token"));

    var options = {
      key: process.env.NEXT_PUBLIC_ROZARPAY_KEY_ID,
      key_secret: process.env.NEXT_PUBLIC_ROZARPAY_KEY_SECRET_KEY,
      amount: parseInt(totalPrice * 100),
      currency: "INR",
      order_receipt: "order_receiptid" + userData.name,
      name: "aditya_Grocery_store",
      description: "for testing purpose",

      handler: function (response) {
        const paymentId = response.razorpay_payment_id;
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split("T")[0];

        const orderInfo = {
          cartItems: cartItemList,
          addressInfo: addressInfo,
          amount: totalPrice,
          date: formattedDate,
          email: token.user.email,
          userid: token.user.id,
          paymentId,
        };
        console.log(orderInfo);
        createOrder(orderInfo, token.jwt);
      },
      theme: {
        color: "#3399cc",
      },
    };

    var pay = new window.Razorpay(options);
    pay.open();
  };

  const createOrder = (orderInfo, jwt) => {
    const payload = {
      data: {
        username: orderInfo.addressInfo.name,
        email: orderInfo.email,
        phone: orderInfo.addressInfo.phone,
        date: orderInfo.date,
        zip: orderInfo.addressInfo.zip,
        address: orderInfo.addressInfo.address,
        userid: orderInfo.userid,
        paymentid: orderInfo.paymentId,
        orderitemlist: orderInfo.cartItems,
        status: "true",
        totalOrderAmount: orderInfo.amount,
      },
    };

    GlobalApi.createOrder(payload, jwt).then((res) => {
      console.log(res);
      route.push("/checkout/order-conformation");
      toast("Order Places Successfully");
    });
  };

  return (
    <Button
      disabled={
        !(
          userData.name &&
          userData.email &&
          userData.phone &&
          userData.zip &&
          userData.address
        )
      }
      onClick={() => placeOrder()}
      className="w-full"
    >
      Payment <MoveRightIcon />
    </Button>
  );
}

export default payment;
