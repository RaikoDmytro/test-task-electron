import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "../../components/loading/Loading";
import { Typography } from "@mui/material";
import {projectsByOrgAlias} from "../../services/CRUD/project";
import { OrganizationContext } from "../../context/organization-context";
import Table from "../../components/project/Table";
import {AuthContext} from "../../context/auth-context";

const Home = () => {
  const { current } = useContext(OrganizationContext);
  const { isAuth } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const queryClient = useQueryClient()

  const { isLoading, mutate } = useMutation({
    mutationFn: (orgAlias) => projectsByOrgAlias(orgAlias),
    mutationKey: 'projects',
    onSuccess: (data) => setProjects(data.data.data),
  });

  const makeQuery = () => {
    const { alias } = current;
    if (alias) mutate(alias);
  };

  useEffect(() => {
    if (isAuth) makeQuery();

    return () => { queryClient.cancelQueries('projects') };
  }, [current, isAuth]);

  return (
    <>
      {isLoading && <Loading />}
      <div className="content">
        {((projects && isAuth) && (
          <Table projects={projects} />
        )) || (
          <Typography textAlign="center" variant="h5">
            Here will be displaying projects of selected organization. Please, sign in!
          </Typography>
        )}
      </div>
    </>
  );
};

export default Home;
