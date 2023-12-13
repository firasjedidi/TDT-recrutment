import { isValidEmail, isValidName, isValidPassword } from "./regex";

const validateForm = (type, data, setError) => {
  const errors = {};

  if (type === "login") {
    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(data.email)) {
      errors.email = 'Invalid email';
    }

    if (!data.password) {
      errors.password = 'Password is required';
    } else if (!isValidPassword(data.password)) {
      errors.password = 'Invalid password.';
    }
  } else {
    if (!data.name) {
      errors.name = 'Name is required';
    } else if (!isValidName(data.name)) {
      errors.name = 'Invalid name';
    }

    if (!data.surname) {
      errors.surname = 'Surname is required';
    } else if (!isValidName(data.surname)) {
      errors.surname = 'Invalid surname';
    }

    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(data.email)) {
      errors.email = 'Invalid email';
    }

    if (type !== "update" && !data.password) {
      errors.password = 'Password is required';
    } else if (data.password && !isValidPassword(data.password)) {
      errors.password = 'Invalid password';
    }
    if (type === "update") {
        if (!data.image) {
            errors.image = 'image is required';
        }
    }
  }

  // Set errors using setError function
  setError(errors);

  // Return true if there are no errors, indicating the form is valid
  return Object.keys(errors).length === 0;
};


const validateArticleForm = ( data, setError) => {
    const errors = {};
    if (!data.title) {
        errors.title = 'Title is required';
    }
    if (!data.content) {
        errors.content = 'Content is required';
    }
    if (!data.image) {
      errors.content = 'Image is required';
  }
    setError(errors);
    return Object.keys(errors).length === 0;
};

export  {
    validateForm,
    validateArticleForm
};
