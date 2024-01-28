export default function abbreviateName(name) {
  if (typeof name !== 'string' || name.length === 0) {
    return 'Invalid input';
  }

  if (name.split(' ').length === 1) {
    return name.slice(0, 2).toUpperCase();
  }

  const words = name.split(' ');

  let abbreviation = '';

  // eslint-disable-next-line no-restricted-syntax
  for (const word of words) {
    abbreviation += word.charAt(0).toUpperCase();
  }

  abbreviation = abbreviation.slice(0, 2);

  return abbreviation;
}
