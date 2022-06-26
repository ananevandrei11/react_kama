import * as Yup from 'yup';

export const textLengthAndRequired = (maxLength) => {
  return  Yup.string()
  .max(maxLength, `The text is too long! The text need to be not more than ${maxLength}`)
  .required("Field is required");
}

export const checkboxRequired = (message) => {
  return  Yup.boolean().required("Required").oneOf([true], message);
}

export const emailRequired = (message) => {
  return  Yup.string().email("Invalid email").required("Required");
}