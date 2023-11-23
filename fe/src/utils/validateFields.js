import isNameValid from './isNameValid';
import isEmailValid from './isEmailValid';
import isPhoneValid from './isPhoneValid';

export default function validateFields(name, email, phone) {
  const errors = [];

  if (!isNameValid(name)) {
    errors.push('name');
  }

  if (!isEmailValid(email)) {
    errors.push('email');
  }

  if (!isPhoneValid(phone)) {
    errors.push('phone');
  }

  return errors;
}
