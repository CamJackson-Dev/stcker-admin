import { Resolver } from "react-hook-form";
import validator from "validator";

const validateEmail = (value: string) => {
  if (!validator.isEmail(value)) return "Email is not valid";

  return undefined;
};

const validateName = (field: string) => (value: string) => {
  if (validator.isEmpty(value)) return `${field} is required`;

  if (!validator.isLength(value, { max: 50 }))
    return `${field} should be less than 50 characters`;

  return undefined;
};

const validatePassword = (value: string) => {
  if (!validator.isLength(value, { min: 12 }))
    return "Password should be up to 12 characters";

  return undefined;
};

const validateConfirmPassword = (value: string, match: string) => {
  if (value !== match) return "Password do not match";

  return undefined;
};

const validate = {
  email: validateEmail,
  firstname: validateName("Firstname"),
  lastname: validateName("Lastname"),
  password: validatePassword,
};

export interface FormValues {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const resolver: Resolver<FormValues> = async (values: FormValues) => {
  const errors: Record<string, any> = {};

  Object.keys(values).forEach((field) => {
    const key = field as keyof FormValues;
    const message =
      key === "confirmPassword"
        ? validateConfirmPassword(values.confirmPassword, values.password)
        : validate[key](values[key]);
    if (message) {
      errors[key] = {
        type: "",
        message,
      };
    }
  });

  return {
    errors,
    values,
  };
};

export const isObject = (value: any) =>
  value && typeof value === "object" && !Array.isArray(value);

export const parseValueIfJSONString = (value: any) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};
