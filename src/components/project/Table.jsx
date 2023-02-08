import React from 'react';
import PropTypes from 'prop-types';
import {
  Table as MuiTable, Box, Button, Grid, Paper,
  TableContainer, Typography, TableHead, TableCell,
  TableRow, TableBody
} from "@mui/material";
import { Link } from 'react-router-dom';

const Table = ({ projects }) => {
  const tableBody = projects?.map((project) =>
    <TableRow
      key={project.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {project.name}
      </TableCell>
      <TableCell align="center">
        <div className={`marker circle ${project.active ? 'active' : '' }`} />
      </TableCell>
      <TableCell align="center">{project.short_name}</TableCell>
      <TableCell align="center">
        <div className="marker" style={{ background: project.color }} />
      </TableCell>
      <TableCell align="center">{project.start_date}</TableCell>
      <TableCell align="center">{project.end_date}</TableCell>
    </TableRow>
  );

  return (
    <Box>
      <div className="projects-header">
        <Grid container width="100" justifyContent="space-between" alignItems="center" padding="0 15px">
          <Grid item>
            <Typography variant="h5">
              Projects
            </Typography>
          </Grid>
          <Grid item>
            <Button
              component={Link}
              to="/new-project"
              variant="outlined"
            >
              Add new
            </Button>
          </Grid>
        </Grid>
      </div>

      <div className="table-wrapper">
        <TableContainer component={Paper}>
          <MuiTable>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Active</TableCell>
                <TableCell align="center">Short name</TableCell>
                <TableCell align="center">
                  Color
                </TableCell>
                <TableCell align="center">Start date</TableCell>
                <TableCell align="center">End date</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {tableBody}
            </TableBody>
          </MuiTable>
        </TableContainer>
      </div>
    </Box>
  );
};

Table.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
};

export default Table;
