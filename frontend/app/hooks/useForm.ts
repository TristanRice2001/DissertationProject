import { useState } from "react";

type Values = {
  [key: string]: any;
};

type Validators = {
  [key: string]: (
    value: string,
    allValues?: Values
  ) => string | null | undefined;
};

export const useForm = <T extends Values>(
  initialValues: T,
  validators?: Validators
) => {
  const initialErrors: Values = Object.keys(initialValues).reduce(
    (acc, key) => ({ ...acc, [key]: "" }),
    {}
  );

  // Set two state variables, one for form errors, and one
  // for form values
  const [errors, setErrors] = useState(initialErrors);
  const [values, setValues] = useState(initialValues);

  // Helper function to set an error for a specific value
  const modifyErrorState = (name: string, value: string) => {
    setErrors((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Call this validateValue function any time that a value is changed
  const validateValue = (name: string, value: any, allValues: Values) => {
    if (!validators || !(name in validators)) {
      return;
    }

    // Call the function for the specific form item that is being
    // Changed. This should be provided by the user
    const errorResult = validators[name](value, allValues);

    if (!errorResult || value === "") {
      // If there is no error, then set the error to an empty string
      modifyErrorState(name, "");
      return;
    }

    // If there is an error, then set an error string for that
    // specific form item
    modifyErrorState(name, errorResult);
  };

  // Call teh validateValue function whenever a form item is changed
  const handleChange = (name: string, value: string) => {
    const newValues = {
      ...values,
      [name]: value,
    };
    setValues((prev) => newValues);
    validateValue(name, value, newValues);
  };

  // Check if there are any values missing, or if any errors exist. If so,
  // we can disable the button
  const areValuesMissing = Object.values(values).some((val) => !val);
  const doErrorsExist = Object.values(errors).some((val) => val);

  return {
    values,
    errors,
    areValuesMissing,
    doErrorsExist,
    handleChange,
  };
};
