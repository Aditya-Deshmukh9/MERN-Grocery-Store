"use client";
import GlobalApi from "@/app/Utils/GlobalApi";
import { useCart } from "@/app/_context/UpdateCartItems";
import React, { useEffect, useState } from "react";
import MyOrderList from "@/app/_components/myOrder/MyOrderList";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function orderPage() {
  const [data, setdata] = useState(null);
  const { updatecart } = useCart();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      const jwt = token.jwt;
      const userid = token.user.id;
      myOrders(userid, jwt);
    }
  }, [updatecart]);

  const myOrders = async (userid, jwt) => {
    const getOrders = await GlobalApi.getMyOrder(userid, jwt);
    setdata(getOrders);
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold text-center bg-primary text-white py-3">
        My Orders
      </h2>
      <h2 className="text-primary font-semibold text-2xl p-4">Order History</h2>
      <div className="flex min-w-2xl items-center justify-center px-2 md:px-10">
        <Table className="border shadow-md border-black">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="text-right">Price(₹)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.map((orderdata) => (
                <MyOrderList
                  key={orderdata.id}
                  orderdata={orderdata.orderItemList}
                />
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default orderPage;
