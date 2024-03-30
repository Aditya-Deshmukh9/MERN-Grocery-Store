"use client";
import SeachDetailPage from "@/app/_components/Search/SeachDetailPage";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function Search() {
  const searchParams = useSearchParams();

  return <SeachDetailPage searchParams={searchParams} />;
}

export function SeachDetailspage() {
  return (
    <Suspense>
      <Search />
    </Suspense>
  );
}

export default SeachDetailspage;
