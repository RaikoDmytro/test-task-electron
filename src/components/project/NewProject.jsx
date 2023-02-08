import React, {useContext} from 'react';
import * as Yup from "yup";
import {Box, Button, Grid, Paper, Typography} from "@mui/material";
import { Formik, Form } from "formik";
import FormField from "../form-elements/FormField";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { create as createProjectAPI} from '../../services/CRUD/project';
import { OrganizationContext } from "../../context/organization-context";
import { projectColors } from "../../config";

const initialFormValue = {
  name: '',
  shortName: '',
  color: projectColors[0],
};

const fieldContainerStyles = {
  display: 'grid',
  gridTemplateColumns: '150px 1fr',
  gap: '30px',
  alignItems: 'center',
};

const NewProject = () => {
  const { current } = useContext(OrganizationContext);
  const navigate = useNavigate();

  const { mutate: createQuery } = useMutation({
    mutationFn: (data) => createProjectAPI(current.alias, data),
    mutationKey: 'new-project',
    onSuccess: () => {navigate('/')}
  })

  const createProject = (values, { setSubmitting }) => {
    createQuery(
      {
        Project: {
          active: 1,
          "client_id": "",
          "time_estimated": "",
          "description": "",
          "start_date": "",
          "end_date": "",
          "estimate_units": "1",
          "currency": null,
          "hourly_rate": null,
          "cost_hourly_rate": null,
          "not_billable": false,
          ...values,
          short_name: values.shortName,
        },
      });
    setSubmitting(false);
  }

  const schema = Yup.object().shape({
    name: Yup.string()
      .required("Project name is required"),
    shortName: Yup.string(),
    color: Yup.string()
      .required("Color is required"),
  });

  return (
    <div className="content">
      <Box component={Paper} sx={{ padding: '40px' }}>
        <Typography sx={{ marginBottom: '30px' }} variant="h5">
          New project
        </Typography>

        <Formik
          initialValues={initialFormValue}
          onSubmit={createProject}
          validationSchema={schema}
        >
          {( { setFieldValue, values} ) => (
            <Form>
              <Grid container gap="30px" flexDirection="column">
                <Grid item>
                  <Grid container sx={fieldContainerStyles}>
                    <Typography variant="h6">
                      Name *
                    </Typography>

                    <FormField
                      type="text"
                      name="name"
                      placeholder="Name"
                    />
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid container sx={fieldContainerStyles}>
                    <Typography variant="h6">
                      Short Name
                    </Typography>

                    <FormField
                      type="text"
                      name="shortName"
                      placeholder="Short name"
                    />
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid container sx={fieldContainerStyles}>
                    <Typography variant="h6">
                      Color *
                    </Typography>

                    <FormField
                      disabled
                      type="text"
                      name="color"
                      sx={{ display: 'none' }}
                    />

                    <Grid container gap="15px" flexDirection="row">
                      {projectColors?.map(color => <div
                        key={color}
                        onClick={() => setFieldValue('color', color)}
                        className={`color-element ${values.color === color ? 'active' : ''}`}
                        style={{background: color}}
                      />)}
                    </Grid>
                  </Grid>
                </Grid>

                <Button type="submit" variant="contained" size="large">
                  Add project
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
};

export default NewProject;
