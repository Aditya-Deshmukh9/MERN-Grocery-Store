import React from "react";

function Breadcrumb({ category, slug }) {
  return (
    <div className="p-5">
      Home &gt; Search &gt; {category ? category : "..."} &gt;{" "}
      {slug ? slug : "..."}
    </div>
  );
}

export default Breadcrumb;
