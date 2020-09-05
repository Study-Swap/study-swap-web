import React, { useState, useEffect } from "react";
import { useAuthEffect } from "../hooks/useAuthEffect";

import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import ClassTitle from "./ClassTitle";
import ClassLinkSelect from "./ClassLinkSelect";
import CheckEnrolled from "./CheckEnrolled";
import ClassEditModal from "./ClassEditModal";

import { getClasses } from "../utils/firebaseUtils";

const useStyles = makeStyles((theme) => ({
  mainPaper: {
    width: 870,
    height: 200,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  mainDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "100%",
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
  const [canvasLink, setCanvasLink] = useState<string>("www.canvas.com");
  const [emailLink, setEmailLink] = useState<string>("www.gmail.com");
  const [classWebsiteLink, setClassWebsiteLink] = useState<string>(
    "www.google.com"
  );

  useAuthEffect(() => {
    getClasses(["1"]).then((classList) => {
      setClassTitle(classList[0].classTitle);
      setClassTime(classList[0].classTime);
      setClassSection(classList[0].classSection);
      setProfName(classList[0].profName);
      setGSIName(classList[0].gsiName);
      setIANames(classList[0].iaNames);
      setCanvasLink(classList[0].canvasLink);
      setEmailLink(classList[0].emailLink);
      setClassWebsiteLink(classList[0].classWebsiteLink);
    });
  }, []);

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
              <ClassLinkSelect
                canvasLink={canvasLink}
                emailLink={emailLink}
                classWebsiteLink={classWebsiteLink}
              />
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
              canvasLink={canvasLink}
              setCanvasLink={setCanvasLink}
              emailLink={emailLink}
              setEmailLink={setEmailLink}
              classWebsiteLink={classWebsiteLink}
              setClassWebsiteLink={setClassWebsiteLink}
            />
          </div>
        </Paper>
      </Grid>
    </Card>
  );
}
