module.exports = function isValidEmail(string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(string);
};
