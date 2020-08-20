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
    flex: 1,
  },

  control: {
    padding: 2,
  },
});

export default function Feed(props: any) {
  console.log(props.filter);
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

  function isInToShow(post: postModel) {
    var toShow = true;
    try {
      toShow = props.categoryFilter[post.postCategory];
      console.log(props.categoryFilter);
    } catch (error) {
      console.error(error);
    }
    return toShow;
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={6}
      //className={classes.root}
      style={{ overflow: "auto" }}
    >
      <Grid item>
        <NewPost
          onClick={(post: postModel) => {
            addPost(post.userId, post.classId, post).then(
              (resultingId: any) => {
                post.id = resultingId;
              }
            );
            setPostState([post, ...postState]);
          }}
        />
      </Grid>
      {postState
        .filter((post) => isInToShow(post))
        .map((thisPost, index) => (
          <Grid item key={thisPost.id} style={{ width: "500px" }}>
            <FeedItem
              id={thisPost.id}
              postUserName={thisPost.postUserName}
              postClassName={thisPost.postClassName}
              postText={thisPost.postText}
              timestamp={thisPost.timestamp}
              postCategory={thisPost.postCategory}
              edited={thisPost.edited}
              userId={thisPost.userId}
              classId={thisPost.classId}
            />
          </Grid>
        ))}
    </Grid>
  );
}
