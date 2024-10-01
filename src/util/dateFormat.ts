import { format } from "date-fns";

export const dateFormat = (date?: Date, form = "full") => {
  if (!date) {
    return "";
  }

  if (form === "full") {
    return format(date, "yyyy. MM. dd.");
  }

  if (form === "year") {
    return format(date, "yyyy");
  }

  if (form === "year month") {
    return format(date, "yyyy. MM");
  }
};
