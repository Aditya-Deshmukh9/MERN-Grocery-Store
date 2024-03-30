import { Loader } from "lucide-react";
import React from "react";

function Loading() {
  return (
    <div className="h-full flex items-center justify-center">
      <Loader className="animate-spin" size={50} />
    </div>
  );
}

export default Loading;
