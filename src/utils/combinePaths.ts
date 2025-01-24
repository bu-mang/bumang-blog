export const combinePaths = (target: string, parents?: string[]) => {
  const result = `${parents?.join("/")}${target}`;
  return result;
};
