import { Minus, Plus } from "lucide-react";
import React from "react";

function AdjustQuantity({ quantity, setQuantity }) {
  return (
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
  );
}

export default AdjustQuantity;
