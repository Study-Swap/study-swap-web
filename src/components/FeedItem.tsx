import React, { useContext, useState, useEffect, ChangeEvent } from "react";
import { UserContext } from "../constants/UserContext";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";

import Post from "../components/Post";
import Comment from "../components/Comment";
import NewComment from "../components/NewComment";

import { commentModel } from "../constants/Models";
import { getComments, addComment } from "../utils/firebaseUtils";

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

interface FeedItemProps {
  id: string | undefined;
  postUserName: string;
  postClassName?: string; // Do not need currently since only engr 100
  postCategory: string;
  postText: string;
  timestamp: string;
  edited: boolean;
  classId: string;
  likedBy: string[];
  isLiked: boolean;
  profilePic: string;
  userId: string;
}

export default function FeedItem({
  id,
  postUserName,
  postClassName,
  postCategory,
  postText,
  timestamp,
  edited,
  classId,
  likedBy,
  isLiked,
  profilePic,
  userId,
}: FeedItemProps) {
  // Context
  const { user } = useContext(UserContext);

  const classes = useStyles();

  const [commentState, setCommentState] = useState<commentModel[]>([]);
  //stores status of new comment input field
  const [newCommentInput, setNewCommentInput] = useState("");
  //stores whether or not comments shown
  const [commentsShown, setCommentsShown] = useState(false);

  useEffect(() => {
    let postId = String(id);
    getComments(postId) // classId is hardcoded for now
      .then((res) => {
        setCommentState(res);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewCommentInput(event.target.value);
  }; //updates stored value of new comment input field

  function toggleCommentClick() {
    setCommentsShown(!commentsShown);
  } //toggles between shown and not shown

  const [numComments, setNumComments] = useState(commentState.length);

  function newCommentClick() {
    setNumComments(numComments + 1);
    addComment({
      //id: "104",
      // foreign key relations
      userId: user.id,
      postId: String(id),
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
          postId: String(id),
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
        id={id}
        postUserName={postUserName}
        postClassName={postClassName}
        postCategory={postCategory}
        postText={postText}
        timestamp={timestamp}
        edited={edited}
        classId={classId}
        likedBy={likedBy}
        isLiked={isLiked}
        onClick={toggleCommentClick}
        commentsShown={commentsShown}
        profilePic={profilePic}
        userId={userId}
        numberComments={commentState.length}
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
                    commenterId={thisComment.userId}
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
                commenterName={commentState[0].commenterName}
                profilePic={commentState[0].commenterProfilePic}
                timestamp={commentState[0].timestamp}
                commentText={commentState[0].commentText}
                likedBy={commentState[0].likedBy}
                commenterId={commentState[0].userId}
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
