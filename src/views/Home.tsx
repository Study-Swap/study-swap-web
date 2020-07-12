// eslint-disable-next-line
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../constants/UserContext";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Post from "../components/Post";
import NewPost from "../components/NewPost";
// eslint-disable-next-line
import history from "../utils/historyUtils";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: 2,
  },
});

export default function Home() {
  // eslint-disable-next-line
  const { user } = useContext(UserContext);
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md">
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item>
          <NewPost />
        </Grid>
        <Grid item>
          <Post />
        </Grid>
        <Grid item>
          <Post />
        </Grid>
        <Grid item>
          <Post />
        </Grid>
        <Grid item>
          <Post />
        </Grid>
      </Grid>
    </Container>
  );
}
