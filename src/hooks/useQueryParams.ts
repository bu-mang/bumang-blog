import { usePathname, useSearchParams } from "next/navigation";

export function useQueryParams() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const updateQuery = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      params.set(key, value);
    });
    return `${pathname}?${params.toString()}`;
  };

  const removeQuery = (keys: string | string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    const keysArray = Array.isArray(keys) ? keys : [keys];
    keysArray.forEach((key) => params.delete(key));
    return `${pathname}?${params.toString()}`;
  };

  return { updateQuery, removeQuery };
}
