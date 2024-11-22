export function calculateAge(birthday: Date): number {
  const today = new Date(); // Get the current date
  let age = today.getFullYear() - birthday.getFullYear(); // Calculate the difference in years

  // Adjust age if the birthday hasn't occurred yet this year
  const monthDiff = today.getMonth() - birthday.getMonth();
  const dayDiff = today.getDate() - birthday.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
}