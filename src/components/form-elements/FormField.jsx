import React from 'react';
import {TextField} from "formik-mui";
import {Field} from "formik";

const FormField = (props) => {
  return (
    <Field
      component={TextField}
      {...props}
    />
  );
};

export default FormField;
