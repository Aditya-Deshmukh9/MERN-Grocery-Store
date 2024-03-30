"use client";
import GlobalApi from "@/app/Utils/GlobalApi";
import { useCart } from "@/app/_context/UpdateCartItems";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

function AddToCart({ product, productTotalPrice, quantity }) {
  const { updatecart, setupdatecart } = useCart();
  const [isLoading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  const route = useRouter();

  const addToCart = () => {
    setLoading(true);
    if (token === null) {
      route.push("/signin");
      setLoading(false);
    }

    if (token) {
      const jwt = token.jwt;
      const user = token.user;
      const data = {
        data: {
          quantity: quantity,
          amount: (quantity * productTotalPrice).toFixed(2),
          products: product.id,
          users_permissions_users: user.id,
          userId: user.id,
        },
      };

      GlobalApi.addProductToCartApi(data, jwt).then(
        (res) => {
          console.log(res.data.data);
          setupdatecart(!updatecart);
          toast("Added to Cart");
          setLoading(false);
        },
        (e) => {
          toast("Error while adding into cart");
          console.log(e);
          setLoading(false);
        }
      );
    }
  };

  return (
    <Button className="w-full" onClick={addToCart} disabled={isLoading}>
      {isLoading ? <Loader className="animate-spin" /> : "Add To Cart"}
    </Button>
  );
}

export default AddToCart;
