import React, { useState, useEffect } from "react";
// eslint-disable-next-line
import { UserContext } from "../constants/UserContext";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import NewPost from "../components/NewPost";
import FeedItem from "../components/FeedItem";
import { postData } from "../DummyData/home";
import { getPosts, getFeed, addPost } from "../utils/firebaseUtils";
import { postModel } from "../constants/Models";

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
  const [postState, setPostState] = useState<any[]>([]);

  useEffect(() => {
    console.log(postState);
    getPosts("1") // classId is hardcoded for now
      .then((res) => {
        setPostState(res);
      })
      .catch((err) => console.error(err));
  }, []); // TODO: Add loading indicator and put "refresh" into empty array

  return (
    <Container component="main" maxWidth="md">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={6}
        className={classes.root}
        //style={{ width: "500px" }}
      >
        <Grid item>
          <NewPost
            onClick={(post: postModel) => {
              setPostState([post, ...postState]);
              addPost(post.userId, post.classId, post);
            }}
          />
        </Grid>
        {postState.map((thisPost, index) => (
          <Grid item key={index} style={{ width: "500px" }}>
            <FeedItem
              id={thisPost.id}
              postUserName={thisPost.postUserName}
              postClassName={thisPost.postClassName}
              postText={thisPost.postText}
              timestamp={thisPost.timestamp}
              edited={thisPost.edited}
              userId={thisPost.userId}
              classId={thisPost.classId}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
