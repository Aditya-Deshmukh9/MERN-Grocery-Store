import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function CartItemList({ data, onDelItem }) {
  const [subTotal, setsubTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    data.forEach((element) => {
      total = total + element.amount;
    });
    setsubTotal(total);
  }, [data]);

  return (
    <div className="h-screen w-full">
      <div className="h-3/4 overflow-y-auto flex flex-col items-center">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-between w-full border-black items-center my-2 p-2"
          >
            <div className="flex items-center gap-2">
              <Image
                src={item.imgurl}
                alt="image"
                height={70}
                width={70}
                className="border"
              />
              <div>
                <h2 className="text-sm font-bold text-black">{item.title}</h2>
                <h2 className="text-sm font-semibold text-gray-700">
                  Quantity:<span> {item.quantity}</span>
                </h2>
                <h2 className="text-sm font-bold  text-gray-900">
                  ₹{item.actualPrice}
                </h2>
              </div>
            </div>
            <Trash2Icon
              onClick={() => onDelItem(item.id)}
              className="h-5 w-5 cursor-pointer"
            />
          </div>
        ))}
      </div>
      <div className="h-[10%] w-[90%] absolute bottom-6 flex flex-col">
        <h2 className="text-lg font-semibold text-gray-700 flex justify-between">
          Subtotal: <span>₹{subTotal}</span>
        </h2>
        <Button>View Cart </Button>
      </div>
    </div>
  );
}

export default CartItemList;
