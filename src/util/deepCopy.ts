export const deepCopy = <T extends object | any[]>(item: T): T => {
  return JSON.parse(JSON.stringify(item));
};
