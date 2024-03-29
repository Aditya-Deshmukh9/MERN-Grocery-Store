"use client";
import { useState, useEffect } from "react";
import { CircleCheckBig } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const OrderConfirmationPage = () => {
  const router = useRouter();
  const [counter, setCounter] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      // Decrease counter by 1 every second
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    // Redirect to "My Orders" page after 10 seconds
    setTimeout(() => {
      router.push("/order");
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full flex justify-center bg-green-400 items-center">
      <div className="flex flex-col items-center gap-4 px-7 py-8 p-4 justify-center">
        <CircleCheckBig size={100} />
        <h1>Order Confirmed Successfully ✅</h1>
        <p>Redirecting to My Orders in {counter} seconds...</p>
        <Link
          href="/order"
          className="bg-primary text-white font-semibold rounded-md px-3 py-2"
        >
          My Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
