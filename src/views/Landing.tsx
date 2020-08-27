import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {},
});

export default function Landing() {
  return (
    <Container component="main" maxWidth="md">
      <Grid item xs={12}></Grid>
    </Container>
  );
}
