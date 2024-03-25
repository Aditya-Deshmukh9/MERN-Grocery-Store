import { CircleCheckBig, Link } from "lucide-react";
import React from "react";

function orderConformationPage() {
  return (
    <div className="h-screen w-full">
      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-green-400 items-center mt-4 h-[60%] w-[30%]">
        <div className="flex flex-col items-center gap-4 justify-center">
          <CircleCheckBig size={100} />
          <h1>Order Conformed Successfull ✅</h1>
          <Link href="/order" className="bg-primary text-white px-3 py-2">
            My Orders
          </Link>
        </div>
      </div>
    </div>
  );
}

export default orderConformationPage;
