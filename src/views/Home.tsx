import React, { useState } from "react";
// eslint-disable-next-line
import { UserContext } from "../constants/UserContext";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import NewPost from "../components/NewPost";
import FeedItem from "../components/FeedItem";
import { postData } from "../DummyData/home";

// eslint-disable-next-line
import history from "../utils/historyUtils";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },

  control: {
    padding: 2,
  },
});

export default function Home() {
  const classes = useStyles();
  // eslint-disable-next-line
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
        <Grid item>
          <NewPost />
        </Grid>
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
