import {
  Button,
  ButtonProps,
  TextField,
  TextFieldProps,
} from "@material-ui/core";
import { DeepMap, FieldError, UseFormRegister } from "react-hook-form";
import React from "react";

import { FormValues } from "../../utils/validations";

export const FormButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      color="primary"
      disableElevation
      fullWidth
      size="large"
      variant="contained"
      type="submit"
      {...props}
    />
  );
};

type FormFieldProps = TextFieldProps & {
  register: UseFormRegister<FormValues>;
  name: keyof FormValues;
  errors: DeepMap<FormValues, FieldError>;
};

export const FormField: React.FC<FormFieldProps> = ({
  register,
  name,
  errors,
  ...textFieldProps
}) => {
  const commonProps = {
    style: { margin: "1rem auto" },
    error: Boolean(errors[name]?.message),
    helperText: errors[name]?.message,
    fullWidth: true,
    inputRef: register(name).ref,
    label: name[0].toUpperCase() + name.slice(1),
    name: register(name).name,
    onChange: register(name).onChange,
    onBlur: register(name).onBlur,
    size: "small" as const,
    variant: "outlined" as const,
  };

  return <TextField {...commonProps} {...textFieldProps} />;
};

interface FormProps
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {}

export const Form: React.FC<FormProps> = (props) => {
  return <form style={{ width: "100%" }} {...props} />;
};
