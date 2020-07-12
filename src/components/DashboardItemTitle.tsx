import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

export default function DashboardItemTitle(props: any) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

DashboardItemTitle.propTypes = {
  children: PropTypes.node,
};
