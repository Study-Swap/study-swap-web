// eslint-disable-next-line
import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../constants/UserContext";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Post from "../components/Post";
import Comment from "../components/Comment";
import NewComment from "../components/NewComment";
import FeedItem from "../components/FeedItem";
import { postModel, commentModel } from "../constants/Models";
import { postData, commentData } from "../DummyData/home";

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
  // eslint-disable-next-line

  const classes = useStyles();
  const [postState, setPostState] = useState(postData);

  return (
    <Container component="main" maxWidth="md">
      <div>Home!</div>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={6}
        className={classes.root}
      >
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
