"use client";
import GlobalApi from "@/app/Utils/GlobalApi";
import Loading from "@/app/_components/Loading";
import NotFound from "@/app/_components/NotFound";
import { Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
const SeachDetailPage = React.lazy(() =>
  import("@/app/_components/Search/SeachDetailPage")
);

function SeachDetailspage() {
  const [data, setData] = useState(null);
  const [notFound, setnotFound] = useState(false);
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = async () => {
    try {
      const search = searchParams.get("query");
      await GlobalApi.getSearchDeatils(search).then((res) => setData(res));
    } catch (error) {
      setnotFound(true);
      console.error("Error fetching data:", error);
    }
  };

  if (notFound) return <NotFound />;

  if (data === null) return <Loading />;

  return (
    <Suspense fallback={<Loading />}>
      <SeachDetailPage
        data={data}
        quantity={quantity}
        setQuantity={setQuantity}
      />
    </Suspense>
  );
}

export default SeachDetailspage;
