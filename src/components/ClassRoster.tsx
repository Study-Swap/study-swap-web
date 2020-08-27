import React, { useState, useEffect } from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

import { getClassRoster } from "../utils/firebaseUtils";

const useStyles = makeStyles({
  rosterItemPaper: {
    width: "100%",
    height: 60,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#D9D9D9",
    padding: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 5,
  },
  divider: { marginTop: 10, width: "100%" },
  mainPaper: {
    width: "100%",
    //minHeight: 600,
    //maxHeight: 900,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 5,
  },
  mainDiv: {
    width: "100%",
    //minHeight: 565,
    //maxHeight: 865,
    paddingTop: 5,
    paddingRight: 12,
    paddingLeft: 12,
  },
});

export default function ClassRoster() {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [classRoster, setClassRoster] = useState<any[]>([]);

  useEffect(() => {
    getClassRoster("1").then((roster) => setClassRoster(roster));
  });

  return (
    <Paper
      style={{
        height: open ? 900 : 600,
      }}
      className={classes.mainPaper}
    >
      <Typography variant="h5">Class Roster</Typography>
      <Divider variant="fullWidth" className={classes.divider} />
      <div
        style={{
          height: open ? 865 : 565,
          overflow: open ? "auto" : "hidden",
        }}
        className={classes.mainDiv}
      >
        {classRoster.map((item, index) => {
          return (
            <Paper
              key={index}
              elevation={1}
              className={classes.rosterItemPaper}
            >
              <Avatar
                style={{ height: 50, width: 50 }}
                alt="Prof Pic"
                src={item.profilePicture}
              />
              <div style={{ marginLeft: 20 }}>
                <Link style={{ color: "black", fontSize: 16 }}>
                  {item.name}
                </Link>
                <Typography>{item.email.split("@")[0]}</Typography>
              </div>
            </Paper>
          );
        })}
      </div>
      <Divider variant="fullWidth" className={classes.divider} />
      {open ? (
        <ExpandLessIcon
          fontSize="small"
          onClick={() => {
            setOpen(!open);
          }}
        />
      ) : (
        <ExpandMoreIcon
          fontSize="small"
          onClick={() => {
            setOpen(!open);
          }}
        />
      )}
    </Paper>
  );
}
