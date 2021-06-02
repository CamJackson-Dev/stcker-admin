import {
  CircularProgress,
  Paper,
  Typography,
  Container,
} from "@material-ui/core";
import React, { useState } from "react";
import { useLogin } from "react-admin";
import { useForm } from "react-hook-form";
import { useGoogleLogin } from "react-google-login";

import CustomAlert from "../../components/alert";
import Header from "../../components/header";
import { Form, FormButton, FormField } from "../../components/form";
import { useStyles } from "./styles";
import {
  FormValues,
  isObject,
  parseValueIfJSONString,
  resolver,
} from "../../utils/validations";
import { EnhancedDivider, GoogleButton } from "./button";
import toast from "react-hot-toast";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const login = useLogin();
  const { loaded, signIn } = useGoogleLogin({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID!,
    onSuccess: handleGoogleSuccess,
    onFailure: handleGoogleFailure,
  });
  const classes = useStyles();
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<FormValues>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: { email: "", password: "" },
    resolver,
  });

  async function handleGoogleSuccess(response: any) {
    setLoading(true);
    try {
      await login({ tokenId: response.tokenId });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleGoogleFailure(error: any) {
    let message = error.error?.split("_").join(" ");
    toast.error(message);
  }

  async function onSubmit(formData: FormValues) {
    setLoading(true);
    try {
      await login(formData);
    } catch (ex) {
      const fields = Object.keys(formData);
      const errors = parseValueIfJSONString(ex.message);

      if (isObject(errors)) {
        if (errors.message) {
          setMessage(errors.message);
        }

        Object.keys(errors).forEach((errorKey) => {
          if (fields.includes(errorKey)) {
            setError(errorKey as keyof FormValues, {
              message: errors[errorKey],
            });
          }
        });
      } else {
        setMessage(errors);
      }
    } finally {
      setLoading(false);
    }
  }

  const disabled = loading || !loaded;
  return (
    <Paper className={classes.root} square variant="outlined">
      <Header />
      <Container maxWidth="xs" className={classes.container}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <CustomAlert
            message={message}
            open={Boolean(message)}
            onClose={() => setMessage("")}
            severity="error"
          />
          <Typography className={classes.legend} component="h1" variant="h6">
            Welcome back Admin
          </Typography>
          <FormField register={register} name="email" errors={errors} />
          <FormField
            register={register}
            name="password"
            errors={errors}
            type={"password"}
          />
          <FormButton className={classes.button} disabled={disabled}>
            {disabled ? (
              <CircularProgress size={25} color="primary" />
            ) : (
              "LOGIN"
            )}
          </FormButton>
          <EnhancedDivider />
          <GoogleButton
            disabled={disabled}
            onClick={signIn}
            text="Login with Google"
          />
        </Form>
      </Container>
    </Paper>
  );
};

export default LoginPage;
