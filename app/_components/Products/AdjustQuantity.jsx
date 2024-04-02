import { Minus, Plus } from "lucide-react";
import React from "react";

function AdjustQuantity({ quantity, setQuantity, productTotalPrice }) {
  return (
    <div className="flex items-center">
      <div className="p-2 flex border gap-10 items-center px-5">
        <button
          disabled={quantity === 1}
          onClick={() => setQuantity(quantity - 1)}
        >
          <Minus />
        </button>
        <h2>{quantity}</h2>
        <button
          disabled={quantity === 10}
          onClick={() => setQuantity(quantity + 1)}
        >
          <Plus />
        </button>
      </div>
      <h2 className="text-xl font-semibold">
        =₹{productTotalPrice * quantity}
      </h2>
    </div>
  );
}

export default AdjustQuantity;
