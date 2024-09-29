import { format } from "date-fns";

export const dateFormat = (date?: Date) => {
  if (date) {
    return format(date, "yyyy. MM. dd.");
  }

  return "";
};
