const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Function to validate names
const isValidName = (name) => {
  return nameRegex.test(name);
};

// Function to validate emails
const isValidEmail = (email) => {
  return emailRegex.test(email);
};

// Function to validate passwords
const isValidPassword = (password) => {
  return passwordRegex.test(password);
};

export {isValidName,isValidEmail,isValidPassword}