import React, {useContext, useEffect} from 'react';
import { Formik, Form, Field } from 'formik';
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { TextField } from 'formik-mui';
import * as Yup from 'yup';
import { AuthContext } from "../../context/auth-context";

const initialFormValue = { email: '', password: '' };
const Login = () => {
  const { isAuth, login, logout, error } = useContext(AuthContext);

  useEffect(() => {
    if (isAuth) logout()
  }, [isAuth])

  const signIn = (values) => {
    login(values);
  }

  const schema = Yup.object().shape({
    email: Yup
      .string()
      .email("Please, enter email!")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password is too short"),
  });

  return (
    <div className="content-wrapper">
      <Formik
        initialValues={initialFormValue}
        onSubmit={signIn}
        validationSchema={schema}
      >
        {({ isSubmitting }) => (
        <Form className="form login">
          <Box
            component={Paper}
            sx={{
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Grid container width="100%" gap="30px" flexDirection="column" justifyContent="space-between" alignItems="center">
            <Typography variant="h4">
              Sign in
            </Typography>

            <Field
              component={TextField}
              type="text"
              name="email"
              label="E-mail"
              placeholder="E-mail"
              autoComplete="username"
            />
            <Field
              component={TextField}
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
              autoComplete="current-password"
            />

            {error && (
              <Typography color="error">
                {error}
              </Typography>
            )}

            <Button type="submit" disabled={isSubmitting} variant="contained" size="large">
              Sign in
            </Button>
          </Grid>
          </Box>
        </Form>
        )}

      </Formik>
    </div>
  );
};

export default Login;
