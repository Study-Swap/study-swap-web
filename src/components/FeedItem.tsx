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

function remove(array: string[], value: string): string[] {
  const index = array.indexOf(value);
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

export default function FeedItem(props: any) {
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
    addComment({
      //id: "104",
      // foreign key relations
      userId: user.id,
      postId: String(props.id),
      // comment specific
      commenterName: `${user.firstName} ${user.lastName}`,
      //timestamp: "tuesday..",
      commentText: newCommentInput,
      likedBy: [],
      commenterProfilePic: user.profilePicture ? user.profilePicture : "",
    }).then((ret) => {
      setCommentState([
        ...commentState,
        {
          id: ret.id,
          // foreign key relations
          userId: user.id,
          postId: String(props.id),
          // comment specific
          commenterName: `${user.firstName} ${user.lastName}`,
          timestamp: ret.timestamp,
          commentText: newCommentInput,
          likedBy: [],
          commenterProfilePic: user.profilePicture ? user.profilePicture : "",
        },
      ]);
      setNewCommentInput("");
    });
  }

  return (
    <Card className={classes.root}>
      <Post
        id={props.id}
        postUserName={props.postUserName}
        postClassName={props.postClassName}
        postCategory={props.postCategory}
        postText={props.postText}
        timestamp={props.timestamp}
        edited={props.edited}
        userId={props.userId}
        classId={props.classId}
        likedBy={props.likedBy}
        isLiked={props.isLiked}
        onClick={toggleCommentClick}
        commentsShown={commentsShown}
        profilePic={props.profilePic}
      />

      {commentState.length > 0 ? (
        commentsShown ? (
          <CardContent className={classes.commentContainer}>
            {commentState.map((thisComment, index) => {
              var commentLiked;
              thisComment.likedBy.indexOf(user.id) !== -1
                ? (commentLiked = true)
                : (commentLiked = false);
              return (
                <Grid item key={index} xs={12}>
                  <Comment
                    id={thisComment.id}
                    userId={thisComment.userId}
                    postId={thisComment.postId}
                    profilePic={thisComment.commenterProfilePic}
                    commenterName={thisComment.commenterName}
                    timestamp={thisComment.timestamp}
                    commentText={thisComment.commentText}
                    likedBy={thisComment.likedBy}
                    commentLiked={commentLiked}
                    index={index}
                    onLike={(index: number, likedState: boolean) => {
                      var arrayLikes = commentState[index].likedBy;
                      if (likedState) {
                        arrayLikes = remove(arrayLikes, user.id);
                      } else {
                        arrayLikes.push(user.id);
                      }
                      setCommentState([
                        ...commentState.slice(0, index),
                        {
                          ...commentState[index],
                          likedBy: [...arrayLikes],
                        },
                        ...commentState.slice(index + 1),
                      ]);
                    }}
                  />
                </Grid>
              );
            })}
          </CardContent>
        ) : (
          <CardContent className={classes.commentContainer}>
            <Grid item xs={12}>
              <Comment
                id={commentState[0].id}
                userId={commentState[0].userId}
                postId={commentState[0].postId}
                commenterName={commentState[0].commenterName}
                profilePic={commentState[0].commenterProfilePic}
                timestamp={commentState[0].timestamp}
                commentText={commentState[0].commentText}
                likedBy={commentState[0].likedBy}
                commentLiked={
                  commentState[0].likedBy.indexOf(user.id) !== -1 ? true : false
                }
                index={0}
                onLike={(index: number, likedState: boolean) => {
                  var arrayLikes = commentState[index].likedBy;
                  if (likedState) {
                    arrayLikes = remove(arrayLikes, user.id);
                  } else {
                    arrayLikes.push(user.id);
                  }
                  setCommentState([
                    ...commentState.slice(0, index),
                    {
                      ...commentState[index],
                      likedBy: [...arrayLikes],
                    },
                    ...commentState.slice(index + 1),
                  ]);
                }}
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
