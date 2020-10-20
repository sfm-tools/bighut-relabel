// TODO: looks wrong, need to come up with normal names and place in a more correct place
export const ContainsString = (search: string, value: string): boolean => (
  value.includes(search)
);

export const EqualStrings = (a: string, b: string): boolean => (
  a === b
);

export type StringComparer = (a: string, b: string) => boolean;
