 export const signUpSchema = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  } else if (values.firstName.length < 2 && values.firstName.length > 100) {
    errors.firstName = 'Must be between 2 to 100 characters '
  }
  if (!values.lastName) {
    errors.lastName = 'Required'
  } else if (values.lastName.length < 2 && values.lastName.length > 100) {
    errors.lastName = 'Must be between 2 to 100 characters'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.age) {
    errors.age = 'Required'
  } else if (isNaN(Number(values.age))) {
    errors.age = 'Must be a number'
  } else if (Number(values.age) < 5) {
    errors.age = 'Sorry, you must be at least 5 years old'
  }
  else if (Number(values.age) > 30) {
    errors.age = 'Sorry, you are not eligble'
  }
  if (values.country === " ") {
    errors.country = 'Required'
  } 
  if (!values.phone) {
    errors.phone = 'Required'
  } else if (!/^[6-9]\d{9}$/gi.test(values.phone)) {
    errors.phone = 'Invalid phone number, must be 10 digits '
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if (!/^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$-_])).{12,}$/i.test(values.password)) {
    errors.password = "Must Contain atleast 12 Characters, One Uppercase, One Lowercase, One Number and one special case Character, special characters must be one of @$-_"
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required'
  } else if (!(values.password === values.confirmPassword)) {
    errors.confirmPassword = "Passwords must match"
  }
  return errors
}