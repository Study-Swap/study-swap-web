import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  rightBottom: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  iconLinks: {
    display: "flex",
    flexDirection: "row-reverse",
    marginBottom: 10,
  },
  image: {
    marginLeft: 15,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#D1D1D1",
    "&:hover": {
      boxShadow: "3px 3px 3px #9E9E9E",
    },
  },
});

export default function ClassLinkSelect() {
  const classes = useStyles();
  const [selection, setSelection] = useState<string>("");

  return (
    <div className={classes.rightBottom}>
      <Typography>{selection}</Typography>
      <div className={classes.iconLinks}>
        <div
          className={classes.image}
          onMouseEnter={() => setSelection("Go To Class Website")}
          onMouseLeave={() => setSelection("")}
        >
          <img
            src={require("../constants/Class_Logos/Website.png")}
            alt="Website Logo"
            style={{ height: 60, padding: 3, width: 75 }}
          />
        </div>
        <div
          className={classes.image}
          onMouseEnter={() => setSelection("Email Instructor")}
          onMouseLeave={() => setSelection("")}
        >
          <img
            src={require("../constants/Class_Logos/Gmail_logo.png")}
            alt="Gmail Logo"
            style={{ height: 60, padding: 3, width: 75 }}
          />
        </div>
        <div
          className={classes.image}
          onMouseEnter={() => setSelection("Go To Canvas Page")}
          onMouseLeave={() => setSelection("")}
        >
          <img
            src={require("../constants/Class_Logos/Canvas_logo.png")}
            alt="Canvas Logo"
            style={{ height: 60, padding: 3, width: 75 }}
          />
        </div>
      </div>
    </div>
  );
}
