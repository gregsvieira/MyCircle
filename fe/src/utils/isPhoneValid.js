export default function isPhoneValid(phone) {
  const regex = /^\d{11}$/;
  return regex.test(phone);
}
