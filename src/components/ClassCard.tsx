import React, { useState } from "react";

import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import ClassTitle from "./ClassTitle";
import ClassLinkSelect from "./ClassLinkSelect";
import CheckEnrolled from "./CheckEnrolled";
import ClassEditModal from "./ClassEditModal";

const useStyles = makeStyles((theme) => ({
  mainPaper: { width: 870, height: 200, padding: 20 },
  mainDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rightSide: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
}));

export default function ClassCard() {
  const classes = useStyles();
  const [editing, setEditing] = useState<boolean>(false);
  const [classTitle, setClassTitle] = useState<string>("Engineering 100");
  const [classTime, setClassTime] = useState<string>(
    "Mondays, Wednesdays 2-3:30 PM"
  );
  const [classSection, setClassSection] = useState<string>("200");
  const [profName, setProfName] = useState<string>("Professor Name");
  const [gsiName, setGSIName] = useState<string>("GSI Name");
  const [iaNames, setIANames] = useState<string>(
    "Name 1, Name 2, Name 3, Name 4, Name 5,"
  );

  return (
    <Card>
      <Grid item xs={12}>
        <Paper className={classes.mainPaper}>
          <div className={classes.mainDiv}>
            <ClassTitle
              classTitle={classTitle}
              classTime={classTime}
              classSection={classSection}
              profName={profName}
              gsiName={gsiName}
              iaNames={iaNames}
            />
            <div className={classes.rightSide}>
              <CheckEnrolled setEditing={setEditing} />
              <ClassLinkSelect />
            </div>
            <ClassEditModal
              editing={editing}
              setEditing={setEditing}
              classTitle={classTitle}
              setClassTitle={setClassTitle}
              classTime={classTime}
              setClassTime={setClassTime}
              classSection={classSection}
              setClassSection={setClassSection}
              profName={profName}
              setProfName={setProfName}
              gsiName={gsiName}
              setGSIName={setGSIName}
              iaNames={iaNames}
              setIANames={setIANames}
            />
          </div>
        </Paper>
      </Grid>
    </Card>
  );
}
