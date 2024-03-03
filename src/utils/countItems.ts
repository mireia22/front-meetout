export const countItems = <T>(items: T[] | undefined): number => {
  return items ? items.length : 0;
};
