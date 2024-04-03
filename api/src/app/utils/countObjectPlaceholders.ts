export const countObjectPlaceholders = (values: string[]): string => {
  let placeholders = '';
  for (let i = 1; i <= values.length; i++) {
    placeholders += `$${i}, `;
  }
  placeholders = placeholders.slice(0, -2);
  return placeholders;
};
