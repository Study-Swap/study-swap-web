import React, { useState } from "react";

import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  titleSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 10,
  },
});

export default function ClassTitle() {
  const classes = useStyles();

  return (
    <div>
      {/* Left Side */}
      <div className={classes.titleSection}>
        <Avatar
          style={{ height: 90, width: 90 }}
          alt="Engineering"
          src={require("../DummyData/Engineering.jpg")}
        />
        <div style={{ marginLeft: 10 }}>
          <Typography variant="h3">Engineering 100</Typography>
          <Typography style={{ color: "grey" }}>
            Section: 200 - Mondays, Wednesdays 2-3:30 PM
          </Typography>
        </div>
      </div>
      <Typography>
        <strong>Professor:</strong> Professor Name{" "}
        <span style={{ marginLeft: 20 }} />
        <strong>GSI:</strong> GSI Name
      </Typography>
      <Typography>
        <strong>Instructional Aids:</strong> Name 1, Name 2, Name 3, Name 4,
        Name 5,
      </Typography>
      <Typography>Name 6, etc.</Typography>
    </div>
  );
}
