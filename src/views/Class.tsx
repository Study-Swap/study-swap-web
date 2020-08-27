import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import FeedItem from "../components/FeedItem";
import { postData } from "../DummyData/home";

import ClassCard from "../components/ClassCard";
import ClassRoster from "../components/ClassRoster";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Class() {
  const classes = useStyles();
  const [postState] = useState(postData);

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
            {postState.map((thisPost, index) => (
              <React.Fragment key={index}>
                <FeedItem
                  postCategory={thisPost.postCategory}
                  postUserName={thisPost.postUserName}
                  postClassName={thisPost.postClassName}
                  postText={thisPost.postText}
                  timestamp={thisPost.timestamp}
                  edited={thisPost.edited}
                  userId={thisPost.userId}
                  classId={thisPost.classId}
                  likedBy={thisPost.likedBy}
                />
                <br />
              </React.Fragment>
            ))}
          </div>
          <div style={{ width: 380, marginLeft: 10 }}>
            <ClassRoster />
          </div>
        </div>
      </Grid>
    </Container>
  );
}
