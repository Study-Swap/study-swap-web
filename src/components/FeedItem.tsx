// eslint-disable-next-line
import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../constants/UserContext";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Post from "../components/Post";
import Comment from "../components/Comment";
import NewComment from "../components/NewComment";
import { postModel, commentModel } from "../constants/Models";
import { postData, commentData } from "../DummyData/home";

// eslint-disable-next-line
import history from "../utils/historyUtils";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  postAndComments: {
    maxWidth: 500,
  },

  control: {
    padding: 2,
  },
});

export default function FeedItem(props: postModel) {
  // eslint-disable-next-line

  const [commentState, setCommentState] = useState(commentData);
  //stores comment dummydata, replace with backend function

  const [newCommentInput, setNewCommentInput] = React.useState("");
  //stores status of new comment input field

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCommentInput(event.target.value);
  }; //updates stored value of new comment input field

  const [commentsShown, setCommentsShown] = React.useState(false);
  //stores whether or not comments shown

  function toggleCommentClick() {
    setCommentsShown(!commentsShown);
  } //toggles between shown and not shown

  const { user } = useContext(UserContext);
  const classes = useStyles();

  function newCommentClick() {
    //adds commentModel object to dummyData
    setCommentState([
      ...commentState,
      {
        id: "104",
        // foreign key relations
        userId: "amahuli",
        postId: "Post1",
        // comment specific
        commenterName: "Chintan Modi",
        timestamp: "tuesday..",
        commentText: newCommentInput,
      },
    ]);
    setNewCommentInput("");
  }

  return (
    <Grid
      item
      container
      spacing={0}
      xs={12}
      className={classes.postAndComments}
    >
      <Post
        postUserName={props.postUserName}
        postClassName={props.postClassName}
        postText={props.postText}
        timestamp={props.timestamp}
        edited={props.edited}
        userId={props.userId}
        classId={props.classId}
        onClick={toggleCommentClick}
      />

      {commentsShown ? (
        commentState.map((thisComment, index) => (
          <Grid item key={index} xs={12}>
            <Comment
              id={thisComment.id}
              userId={thisComment.userId}
              postId={thisComment.postId}
              commenterName={thisComment.commenterName}
              timestamp={thisComment.timestamp}
              yarn
            />
          </Grid>
        ))
      ) : commentState.length > 0 ? (
        <Grid item xs={12}>
          <Comment
            id={commentState[0].id}
            userId={commentState[0].userId}
            postId={commentState[0].postId}
            commenterName={commentState[0].commenterName}
            timestamp={commentState[0].timestamp}
            commentText={commentState[0].commentText}
          />
        </Grid>
      ) : (
        <div> </div>
      )}

      <NewComment
        value={newCommentInput}
        onChange={handleCommentChange}
        onClick={newCommentClick}
      />
    </Grid>
  );
}
