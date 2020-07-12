import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

export default function DashboardTitle(props: any) {
  return (
    <Typography component="h1" variant="h4" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

DashboardTitle.propTypes = {
  children: PropTypes.node,
};
