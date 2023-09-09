module.exports = function getErrorMessage(fields, singular, message) {
  const field = fields.length > 1 ? 'Fields' : 'Field';
  return `${field} ${fields.join(', ')} ${message}`;
};
