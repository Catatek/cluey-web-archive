import * as yup from "yup";

export const STEP_ONE_ONBOARD = "STEP_ONE_ONBOARD";
export const STEP_TWO_ONBOARD = " STEP_TWO_ONBOARD";
export const STEP_THREE_ONBOARD = "STEP_THREE_ONBOARD";
export const STEP_FOUR_ONBOARD = "STEP_FOUR_ONBOARD";
export const STEP_FIVE_ONBOARD = "STEP_FIVE_ONBOARD";
export const STEP_SIX_ONBOARD = "STEP_SIX_ONBOARD";

export const STEP_ONE_SIGNUP = "STEP_ONE_SIGNUP";
export const STEP_TWO_SIGNUP = "STEP_TWO_SIGNUP";
export const STEP_THREE_SIGNUP = "STEP_THREE_SIGNUP";
export const STEP_FOUR_SIGNUP = "STEP_FOUR_SIGNUP";
export const STEP_FIVE_SIGNUP = "STEP_FIVE_SIGNUP";

export const validationSchemaSignup = yup.object().shape({
  email: yup
    .string()
    .email("It must be an email")
    .required("Email is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
      "Passwords require a minimum of 8 characters, at least one letter, and one number."
    ),
});

export const validationSchemaOnboarding = yup.object().shape({
  zip_code: yup.string(),
  age: yup.string(),
  gender: yup.string(),
});

export const handleNavigationValidation = (
  activeStep,
  errors,
  touched,
  values
) => {
  switch (activeStep) {
    case STEP_ONE_SIGNUP:
      if (
        (touched.firstName && errors.firstName) ||
        (touched.lastName && errors.lastName) ||
        (touched.email && errors.email)
      ) {
        return true;
      } else if (!values.firstName || !values.lastName || !values.email) {
        return true;
      } else {
        return false;
      }

    case STEP_FOUR_SIGNUP:
      if (!values.password || values.password.length < 8 || !values.terms) {
        return true;
      } else if (touched.password && errors.password) {
        return true;
      } else {
        return false;
      }
    default:
      return false;
  }
};
