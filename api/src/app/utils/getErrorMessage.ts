export default function getErrorMessage(fields: any[], singular: any, message: any) {
  const field = fields.length > 1 ? 'Fields' : 'Field';
  return `${field} ${fields.join(', ')} ${message}`;
};
