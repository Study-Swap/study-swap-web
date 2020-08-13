//TODO: When you comment it should unhide comments, when you click enter
//it should send comments

// eslint-disable-next-line
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../constants/UserContext";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Post from "../components/Post";
import Comment from "../components/Comment";
import CardContent from "@material-ui/core/CardContent";
import NewComment from "../components/NewComment";
import { postModel } from "../constants/Models";
import { commentModel } from "../constants/Models";
import { commentData } from "../DummyData/home";
import { getComments, addComment } from "../utils/firebaseUtils";

// eslint-disable-next-line
import history from "../utils/historyUtils";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: "100%",
  },

  control: {
    padding: 2,
  },

  commentContainer: {
    paddingBottom: "2px",
  },
});

export default function FeedItem(props: postModel) {
  const [commentState, setCommentState] = useState<commentModel[]>([]);
  //stores comment dummydata, replace with backend function

  useEffect(() => {
    let postId = String(props.id);
    getComments(postId) // classId is hardcoded for now
      .then((res) => {
        setCommentState(res);
      })
      .catch((err) => console.error(err));
  }, []);

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

  // eslint-disable-next-line
  const { user } = useContext(UserContext);
  const classes = useStyles();

  function newCommentClick() {
    //adds commentModel object to dummyData
    setCommentState([
      ...commentState,
      {
        //id: "104",
        // foreign key relations
        userId: "amahuli",
        postId: String(props.id),
        // comment specific
        commenterName: "Chintan Modi",
        timestamp: "ADD FIREBASE TIMESTAMP HERE",
        commentText: newCommentInput,
      },
    ]);
    setNewCommentInput("");

    addComment({
      //id: "104",
      // foreign key relations
      userId: "amahuli",
      postId: String(props.id),
      // comment specific
      commenterName: "Chintan Modi",
      //timestamp: "tuesday..",
      commentText: newCommentInput,
    });
  }

  return (
    <Card className={classes.root}>
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

      {commentState.length > 0 ? (
        commentsShown ? (
          <CardContent className={classes.commentContainer}>
            {commentState.map((thisComment, index) => (
              <Grid item key={index} xs={12}>
                <Comment
                  id={thisComment.id}
                  userId={thisComment.userId}
                  postId={thisComment.postId}
                  commenterName={thisComment.commenterName}
                  timestamp={thisComment.timestamp}
                  commentText={thisComment.commentText}
                />
              </Grid>
            ))}
          </CardContent>
        ) : (
          <CardContent className={classes.commentContainer}>
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
          </CardContent>
        )
      ) : (
        <div> </div>
      )}

      <CardContent style={{ paddingTop: "4px", paddingBottom: "4px" }}>
        <NewComment
          value={newCommentInput}
          onChange={handleCommentChange}
          onClick={newCommentClick}
        />
      </CardContent>
    </Card>
  );
}
