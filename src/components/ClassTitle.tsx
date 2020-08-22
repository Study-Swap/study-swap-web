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

interface ClassTitleProps {
  classTitle: string;
  classTime: string;
  classSection: string;
  profName: string;
  gsiName: string;
  iaNames: string;
}

export default function ClassTitle({
  classTitle,
  classTime,
  classSection,
  profName,
  gsiName,
  iaNames,
}: ClassTitleProps) {
  const classes = useStyles();

  return (
    <div style={{ maxWidth: 500 }}>
      {/* Left Side */}
      <div className={classes.titleSection}>
        <Avatar
          style={{ height: 90, width: 90 }}
          alt="Engineering"
          src={require("../DummyData/Engineering.jpg")}
        />
        <div style={{ marginLeft: 10 }}>
          <Typography variant="h3">{classTitle}</Typography>
          <Typography style={{ color: "grey" }}>
            Section: {classSection} - {classTime}
          </Typography>
        </div>
      </div>
      <Typography>
        <strong>Professor:</strong> {profName}{" "}
        <span style={{ marginLeft: 20 }} />
        <strong>GSI:</strong> {gsiName}
      </Typography>
      <Typography>
        <strong>Instructional Aids:</strong> {iaNames}
      </Typography>
    </div>
  );
}
