import React from 'react';
import { Typography } from "@mui/material";

const NotFound = () => {
  return (
    <div className="content">
      <Typography variant="h4" textAlign="center">
        404 <span style={{ fontSize: '120px' }}>&#129335;</span>
        Not Found
      </Typography>
    </div>
  );
};

export default NotFound;
