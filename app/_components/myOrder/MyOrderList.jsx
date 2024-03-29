"use client";
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";

function MyOrderList({ orderdata }) {
  console.log("orderdata", orderdata, orderdata.amount);
  return (
    <>
      {orderdata.map((e, index) => (
        <TableRow key={index}>
          <TableCell className="font-medium">
            <Image
              src={e.product.data.attributes.images.data[0].attributes.url}
              alt="icon"
              height={28}
              width={28}
            />
          </TableCell>
          <TableCell>{e.product.data.attributes.title}</TableCell>
          <TableCell>{e.quantity}</TableCell>
          <TableCell className="text-right">₹ {e.amount}</TableCell>
        </TableRow>
      ))}
    </>
  );
}

export default MyOrderList;
