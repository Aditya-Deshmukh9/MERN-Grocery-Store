import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";

function CartItemList({ data, onDelItem }) {
  return (
    <div className="h-[500px] overflow-auto scroll-smooth flex flex-col items-center">
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
              <p className="text-sm font-bold text-black">{item.title}</p>
              <p className="text-sm font-semibold text-gray-700">
                Quantity:<span> {item.quantity}</span>
              </p>
              <p className="text-sm font-bold  text-gray-900">₹{item.amount}</p>
            </div>
          </div>
          <button onClick={() => onDelItem(item.id)}>
            <Trash2Icon className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default CartItemList;
