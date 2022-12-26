import * as yup from "yup";

export const basicSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Please enter a valid email address"),
  phone: yup
    .number()
    .positive()
    .integer()
    .required("Please enter a valid phone number"),
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  city: yup.string().required("Required"),
  address: yup.string().required("Required"),
  zip: yup.number().positive().required("Required"),
});
