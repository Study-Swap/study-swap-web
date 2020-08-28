import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import FeedItem from "../components/FeedItem";
import { postData } from "../DummyData/home";

import { getPosts } from "../utils/firebaseUtils";

import ClassCard from "../components/ClassCard";
import ClassRoster from "../components/ClassRoster";
import { postModel } from "../constants/Models";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Class(props: any) {
  const classes = useStyles();
  const [postState, setPostState] = useState<postModel[]>([]);

  React.useEffect(() => {
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
      >
        <ClassCard />
        <br />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ width: 470, marginRight: 10 }}>
            {postState.length > 0 ? (
              postState.map((thisPost: postModel, index) => {
                var isLiked;
                thisPost.likedBy.indexOf(props.userId) !== -1
                  ? (isLiked = true)
                  : (isLiked = false);
                return (
                  <React.Fragment key={index}>
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
                      likedBy={thisPost.likedBy}
                      isLiked={isLiked}
                      profilePic={thisPost.postUserProfilePic}
                    />
                    <br />
                  </React.Fragment>
                );
              })
            ) : (
              <div />
            )}
          </div>
          <div style={{ width: 380, marginLeft: 10 }}>
            <ClassRoster />
          </div>
        </div>
      </Grid>
    </Container>
  );
}
