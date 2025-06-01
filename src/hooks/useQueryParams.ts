import { usePathname, useSearchParams } from "next/navigation";

export function useQueryParams() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const getQueryValue = (key: string) => {
    return searchParams.get(key);
  };

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

  const hasQuery = (key: string) => {
    const value = searchParams.get(key);
    return value !== null && value.trim() !== "";
  };

  const hasQueryValue = (key: string, expectedValue: string) => {
    return searchParams.get(key) === expectedValue;
  };

  return { getQueryValue, updateQuery, removeQuery, hasQuery, hasQueryValue };
}
