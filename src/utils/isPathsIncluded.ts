export const isPathsIncluded = (
  target: string,
  subItemUrl: string,
  ...args: string[]
) => {
  let includedAll = true;
  args.forEach((item) => {
    const res = target.includes(item);
    if (!res) includedAll = false;
  });

  if (subItemUrl === "/") {
    return false;
  }
  const isSubMatched = target.includes(subItemUrl);
  if (!isSubMatched) includedAll = false;

  return includedAll;
};
