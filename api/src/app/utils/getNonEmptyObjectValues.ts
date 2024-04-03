export const getNonEmptyObjectValues = <T>(obj: Record<string, T>): string[] | null => {
  const nonEmptyValues = Object.values(obj)
    .filter(value => value !== null && typeof value === 'string')
    .map(value => value as string);

  return nonEmptyValues.length > 0 ? nonEmptyValues : null;
};
