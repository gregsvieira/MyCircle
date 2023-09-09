module.exports = function validate({
  body,
  requiredFields,
  validators,
}) {
  const emptyFields = [];
  const validatorsErrors = [];

  requiredFields.forEach((key) => {
    const value = body[key];

    if (!value) {
      emptyFields.push(key);
    } else if (validators?.[key] && !validators?.[key](value)) {
      validatorsErrors.push(key);
    }
  });

  Object.keys(validators).forEach((key) => {
    if (body[key] !== undefined && body[key] !== '' && !validators[key](body[key]) && !validatorsErrors.includes(key)) {
      validatorsErrors.push(key);
    }
  });

  return {
    emptyFields,
    validatorsErrors,
    isValid: emptyFields.length === 0 && validatorsErrors.length === 0,
  };
};
