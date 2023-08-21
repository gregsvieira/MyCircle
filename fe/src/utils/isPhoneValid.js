export default function isPhoneNumberValid(phoneNumber) {
  const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  return regex.test(phoneNumber);
}
