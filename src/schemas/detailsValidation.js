export const detailsValidation = values => {
    const errors = {}
    if (!values.subject) {
      errors.subject = 'Required'
    } else if (values.subject.length < 2 && values.subject.length > 100) {
      errors.subject = 'Must be between 2 to 100 characters '
    }
    if (!values.marks) {
      errors.marks = 'Required'
    } else if (isNaN(Number(values.marks))) {
      errors.marks = 'Must be a number'
    } else if ((Number(values.marks)) > 100) {
      errors.marks = 'Marks must be out of 100'
    }
    if (values.class === " ") {
      errors.class = 'Required'
    } 
    if (!values.description) {
        errors.description = 'Required'
      } else if (values.description.length < 2 && values.description.length > 100) {
        errors.description = 'Must be between 2 to 100 characters '
      }
    return errors
  }