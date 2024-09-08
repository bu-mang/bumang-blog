export const capitalize = (str: string) => {
  if (str === "/") return "/";

  const arr = str.split("-");

  if (arr.length === 0) {
    return arr[0].charAt(0).toUpperCase() + arr[0].slice(1);
  } else if (arr.length > 1) {
    return arr
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(" ");
  }
};
