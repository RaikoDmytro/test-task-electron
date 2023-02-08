import React, { useContext } from 'react';
import { Link as DomLink } from 'react-router-dom';
import { AppBar, Link, Avatar, Grid, Button, Autocomplete, TextField } from '@mui/material';
import Typography from "@mui/material/Typography";
import { trackabiDefaultURI } from "../../config";
import { AuthContext } from "../../context/auth-context";
import { OrganizationContext } from "../../context/organization-context";

const autocompleteStyle = {
  ".css-l4u8b9-MuiInputBase-root-MuiInput-root": {
    color: 'white',
    fontWeight: 'bold',
  },
  ".css-l4u8b9-MuiInputBase-root-MuiInput-root:before": {
    border: "0",
  },
  ".css-l4u8b9-MuiInputBase-root-MuiInput-root:hover:before": {
    border: "0",
  }
};

const whiteColor = {
  color: 'white',
};

const Header = () => {
  const { isLoading, isAuth, logout, user } = useContext(AuthContext)
  const { organizations, current, updateCurrent } = useContext(OrganizationContext)
  const imageUrl = trackabiDefaultURI + user?.avatar;

  const changeOrganization = (event, newValue) => {
    updateCurrent(newValue);
  }

  return (
    <AppBar sx={{ width: '100%', padding: '15px 30px', background: '#18c98b' }}>
      <Grid container width="100%" justifyContent="space-between" alignItems="center">
        <Grid item minWidth="150px" maxWidth="50%">
          {(!isLoading && organizations.length !== 0 ) && (
            <Autocomplete
              value={current || organizations[current] || null}
              options={organizations}
              getOptionLabel={(option) =>option.name}
              isOptionEqualToValue={(option, value) => option?.alias === value?.alias}
              disableClearable
              freeSolo
              onChange={changeOrganization}
              sx={autocompleteStyle}
              renderInput={(params) =>
                <TextField
                  {...params}
                  variant="standard"
                  placeholder="Select organization"
                  sx={{ border: 0 }}
                />}
            />
          )}
        </Grid>

        <Grid item>
          <Grid container>
            <Grid item marginRight="40px">
              <Grid container display="flex" height="100%" gap="20px" alignItems="center">
                <Link
                  sx={whiteColor}
                  to='/'
                  component={DomLink}
                  underline="hover"
                >
                  Home
                </Link>

                {isAuth && (
                  <Link sx={whiteColor} onClick={logout}>
                    Logout
                  </Link>
                )}
              </Grid>
            </Grid>
            <Grid item>
              {(isAuth && (
                <Grid container alignItems="center">
                  <Typography
                    color="white"
                    noWrap
                    sx={{
                      marginRight: '10px'
                    }}
                  >
                    {user.name}
                  </Typography>

                  <Avatar alt={user.name} src={imageUrl} />
                </Grid>
              )) || (

                <Button
                  component={DomLink}
                  to="login"
                  variant="contained"
                  sx={whiteColor}
                  size="small"
                >
                  Sign in
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Header;
