// eslint-disable-next-line
import React, { useEffect, useContext } from "react";
import { UserContext } from "../constants/UserContext";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Post from "../components/Post";
import { postModel } from "../constants/Models";

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

  let dummy_data: postModel[] = [
    {
      postUserName: "Ashish Mahuli",
      postClassName: "EECS 281",
      postText: "This is test post #1",
      timestamp: "Tuesday at 5:33 PM",
      edited: false,
      userId: "0000",
      classId: "1111",
    },
    {
      postUserName: "Akul Vijay",
      postClassName: "EECS 280",
      postText: "This is test post #2",
      timestamp: "Tuesday at 6:33 PM",
      edited: false,
      userId: "0000",
      classId: "1111",
    },
  ];

  return (
    <Container component="main" maxWidth="md">
      <div>Home!</div>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        {dummy_data.map((thisPost, index) => (
          <Grid item key={index} xs={12}>
            <Post
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
