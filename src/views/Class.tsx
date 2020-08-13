import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import FeedItem from "../components/FeedItem";
import { postData } from "../DummyData/home";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
  },
});

export default function Class() {
  const classes = useStyles();
  const [postState, setPostState] = useState(postData);

  return (
    <Container component="main" maxWidth="md">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={6}
        className={classes.root}
      >
        <Card style={{ borderStyle: "solid", borderWidth: 1 }}>
          <Grid item xs={12} style={{ borderStyle: "solid", borderWidth: 1 }}>
            <Paper style={{ width: "100%" }}>
              <div>Class Intro Component</div>
            </Paper>
          </Grid>
        </Card>

        {postState.map((thisPost, index) => (
          <FeedItem
            postUserName={thisPost.postUserName}
            postClassName={thisPost.postClassName}
            postText={thisPost.postText}
            timestamp={thisPost.timestamp}
            edited={thisPost.edited}
            userId={thisPost.userId}
            classId={thisPost.classId}
          />
        ))}
      </Grid>
    </Container>
  );
}
