import React, { useContext, useState } from "react";
import { UserContext } from "../constants/UserContext";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";

import history from "../utils/historyUtils";

import {
  addCommentLike,
  removeCommentLike,
} from "../utils/firebaseUtils/comments";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },

  title: {
    fontSize: 14,
    "&:hover": {
      textDecoration: "underline",
    },
  },
  comment: {
    fontSize: 14,
  },
  timestamp: {
    fontSize: 12,
    paddingLeft: "10px",
  },
  media: {
    height: 30,
    width: 30,
  },
  button: {
    height: "30%",
    width: "5%",
    justifyContent: "flex-start",
  },
  commentText: {
    backgroundColor: "#f0f0f0",
    borderRadius: "15px",
    paddingTop: "4px",
    paddingBottom: "4px",
    paddingLeft: "10px",
    paddingRight: "10px",
    display: "inline-block",
  },
}));

interface CommentProps {
  id: string | undefined;
  commentLiked: boolean;
  likedBy: string[];
  index: number;
  commenterName: string;
  profilePic: string;
  commentText: string;
  timestamp: string;
  onLike: Function;
  commenterId: string;
}

export default function Comment({
  id,
  commentLiked,
  likedBy,
  onLike,
  index,
  commenterName,
  profilePic,
  commentText,
  timestamp,
  commenterId,
}: CommentProps) {
  // Context
  const { user, setUser } = useContext(UserContext);

  const classes = useStyles();
  const [likeState, setLikeState] = useState(commentLiked);
  const [lengthState, setLengthState] = useState(likedBy.length);

  function plusLike() {
    onLike(index, likeState);
    setLikeState(true);
    if (id) addCommentLike(id, user.id);
    setLengthState(lengthState + 1);
  }

  function minusLike() {
    onLike(index, likeState);
    setLikeState(false);
    if (id) removeCommentLike(id, user.id);
    setLengthState(lengthState - 1);
  }

  function HasLiked() {
    if (likeState) {
      return (
        <Button
          startIcon={<ThumbUpIcon />}
          className={classes.button}
          size="small"
          onClick={minusLike}
        >
          {lengthState}
        </Button>
      );
    } else {
      return (
        <Button
          startIcon={<ThumbUpAltOutlinedIcon />}
          className={classes.button}
          size="small"
          onClick={plusLike}
        >
          {lengthState}
        </Button>
      );
    }
  }

  return (
    <Grid container item>
      <Grid item xs={1}>
        <Avatar
          className={classes.media}
          alt={commenterName}
          src={profilePic}
        />
      </Grid>

      <Grid item xs={9}>
        <div className={classes.commentText}>
          <Typography
            className={classes.title}
            onClick={() => {
              history.push({
                pathname: "/profile",
                state: { userId: commenterId },
              });
            }}
          >
            <b>{commenterName}</b>
          </Typography>
          <Typography className={classes.comment} gutterBottom>
            {commentText}
          </Typography>
        </div>
        <HasLiked />
        <Typography className={classes.timestamp} color="textSecondary">
          {timestamp}
        </Typography>
      </Grid>
    </Grid>
  );
}
