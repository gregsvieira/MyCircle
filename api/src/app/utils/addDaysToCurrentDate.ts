export default function addDaysToCurrentDate(days: string): Date | null {
  const currentDate = new Date();
  const newDate = new Date(currentDate);
  const daysNumber = convertStringToNumberDays(days);
  console.log({daysNumber});
  if (!daysNumber) {
    return null;
  }

  newDate.setDate(currentDate.getDate() + daysNumber);

  return newDate;
}

function convertStringToNumberDays(days: string): number | null {
  const regex = /^(\d+)\s+days$/;

  const match = days.match(regex);

  if (match && match[1]) {
    return parseInt(match[1], 10);
  }

  return null;
}
