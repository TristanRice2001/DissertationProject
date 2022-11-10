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
  const [errors, setErrors] = useState(initialErrors);
  const [values, setValues] = useState(initialValues);

  const modifyErrorState = (name: string, value: string) => {
    setErrors((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateValue = (name: string, value: any, allValues: Values) => {
    if (!validators || !(name in validators)) {
      return;
    }

    const errorResult = validators[name](value, allValues);

    if (!errorResult || value === "") {
      modifyErrorState(name, "");
      return;
    }

    modifyErrorState(name, errorResult);
  };

  const handleChange = (name: string, value: string) => {
    const newValues = {
      ...values,
      [name]: value,
    };
    setValues((prev) => newValues);
    validateValue(name, value, newValues);
  };

  return {
    values,
    errors,
    handleChange,
  };
};
