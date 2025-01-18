export const calcRatio = (
  originalWidth: number,
  originalHeight: number,
  parentHeight: number,
) => {
  return originalWidth * (originalHeight / parentHeight);
};
