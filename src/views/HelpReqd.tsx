import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function HelpReqd() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <div>Thanks for letting us know! We'll fix your problem in 24 hours.</div>
    </Container>
  );
}
