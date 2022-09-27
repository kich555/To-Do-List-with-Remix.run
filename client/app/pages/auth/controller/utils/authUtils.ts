export function validateUsername(username: string) {
  /* 
    Usernames can only have: 
    - Lowercase Letters (a-z) 
    - Numbers (0-9)
    - Underscores (_)
    - 3 to 12 characters
  */
  const valid = /^[a-z]{1}[a-z0-9_]{2,11}$/.test(username);
  if (!valid) return `Usernames must be at least 3 characters long`;
  return '';
}

export function validatePassword(password: string) {
  /* 
    passwords can only have: 
    - 7 to 15 characters
    - Numbers (0-9)
    - Underscores (_)
  */
  const valid = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{7,14}$/.test(password);

  if (!valid) return `Passwords must be at least 7 characters long`;
  return '';
}

export function capitalize(string: string) {
  return string.replace(/^[a-z]/, char => char.toUpperCase());
}
