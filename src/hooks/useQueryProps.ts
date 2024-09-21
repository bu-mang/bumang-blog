"use client";

import { useSearchParams } from "next/navigation";

const useQueryProps = () => {
  const searchParams = useSearchParams();
  const list = searchParams.get("list");
  const sort = searchParams.get("sort");

  return {
    list,
    sort,
  };
};

export default useQueryProps;
