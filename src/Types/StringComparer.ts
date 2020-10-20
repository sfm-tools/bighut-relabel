export type StringComparer = (a: string, b: string) => boolean;

// TODO: looks wrong, need to come up with normal names and place in a more correct place
export const stringComparison = {
  contains: (search: string, value: string): boolean => (
    value.includes(search)
  ),
  equal: (a: string, b: string): boolean => (
    a === b
  ),
};
