module.exports = function validate({
  body,
  requiredFields,
  validators,
}) {
  const emptyFields = [];
  const validatorsErrors = [];

  Object.entries(body).forEach(([key, value]) => {
    if (!value && requiredFields.includes(key)) {
      emptyFields.push(key);
    }

    if (validators?.[key] && !validators?.[key](value)) {
      validatorsErrors.push(key);
    }
  });

  return {
    emptyFields,
    validatorsErrors,
    isValid: !emptyFields.length && !validatorsErrors.length,
  };
};
