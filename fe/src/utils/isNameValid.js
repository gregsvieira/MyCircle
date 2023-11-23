export default function isNameValid(name) {
  const nameParts = name.trim().split(/\s+/);
  if (nameParts.length < 2) {
    return false;
  }

  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
  return regex.test(name);
}
