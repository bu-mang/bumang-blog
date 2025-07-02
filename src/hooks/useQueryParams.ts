import { usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";

export function useQueryParams() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const getQueryValue = (key: string) => {
    return searchParams.get(key);
  };

  const updateQuery = (
    updates: Record<string, string>,
    removes?: string[] | Record<string, string | null>,
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      params.set(key, value);
    });

    if (removes) {
      if (Array.isArray(removes)) {
        // 기존 로직: 무조건 제거
        removes.forEach((item) => {
          params.delete(item);
        });
      } else {
        // 새로운 로직: 값이 일치할 때만 제거
        Object.entries(removes).forEach(([key, value]) => {
          if (value === null || params.get(key) === value) {
            params.delete(key);
          }
        });
      }
    }
    return `${pathname}?${params.toString()}`;
  };

  const updateArrayQuery = (
    key: string,
    value: string,
    action: "add" | "remove" | "toggle" = "toggle",
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.getAll(key);

    let newValues: string[];

    switch (action) {
      case "add":
        newValues = currentValues.includes(value)
          ? currentValues
          : [...currentValues, value];
        break;
      case "remove":
        newValues = currentValues.filter((v) => v !== value);
        break;
      case "toggle":
      default:
        newValues = currentValues.includes(value)
          ? currentValues.filter((v) => v !== value) // 제거
          : [...currentValues, value]; // 추가
        break;
    }

    // 기존 값들 모두 제거
    params.delete(key);

    // 새 값들 추가
    newValues.forEach((v) => params.append(key, v));

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

  return {
    getQueryValue,
    updateQuery,
    updateArrayQuery,
    removeQuery,
    hasQuery,
    hasQueryValue,
  };
}
