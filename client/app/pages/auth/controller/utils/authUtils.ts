export function validateUsername(username: string) {
  if (typeof username !== 'string' || username.length < 3) {
    return `Usernames must be at least 3 characters long`;
  }
  return undefined;
}

export function validatePassword(password: string) {
  if (typeof password !== 'string' || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
  return undefined;
}

export function capitalize(string: string) {
  return string.replace(/^[a-z]/, char => char.toUpperCase());
}
