export default function formatDate(inputDate) {
  if (typeof inputDate !== 'string') {
    return 'Invalid input';
  }

  const dateObject = new Date(inputDate);

  if (!Number(dateObject.getTime())) {
    return 'Invalid date';
  }

  const year = dateObject.getFullYear().toString().slice(-2);
  const month = (`0${dateObject.getMonth() + 1}`).slice(-2);
  const day = (`0${dateObject.getDate()}`).slice(-2);
  let hour = dateObject.getHours();
  const minute = (`0${dateObject.getMinutes()}`).slice(-2);

  const ampm = hour >= 12 ? 'pm' : 'am';

  hour = hour % 12 || 12;

  const formattedDate = `${month}/${day}/${year} at ${hour}:${minute}${ampm}`;

  return formattedDate;
}
