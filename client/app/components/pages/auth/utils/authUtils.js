export function validateUsername(username) {
    if (typeof username !== 'string' || username.length < 3) {
      return `Usernames must be at least 3 characters long`;
    }
  }
  
export function validatePassword(password) {
    if (typeof password !== 'string' || password.length < 6) {
      return `Passwords must be at least 6 characters long`;
    }
  }