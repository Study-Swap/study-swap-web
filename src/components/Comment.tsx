import React, { useContext, useState } from "react";
import { UserContext } from "../constants/UserContext";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
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
    width: "2%",
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
        <IconButton
          size="small"
          color="primary"
          component="span"
          onClick={minusLike}
        >
          <ThumbUpIcon style={{ marginRight: 2 }} />
          {lengthState === 0 ? " " : lengthState}
        </IconButton>
      );
    } else {
      return (
        <IconButton
          size="small"
          color="primary"
          component="span"
          onClick={plusLike}
        >
          <ThumbUpAltOutlinedIcon style={{ marginRight: 2 }} />
          {lengthState === 0 ? " " : lengthState}
        </IconButton>
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

      <Grid item xs={11}>
        <div style={{ display: "flex", flexDirection: "row" }}>
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
        </div>
        <Typography className={classes.timestamp} color="textSecondary">
          {timestamp}
        </Typography>
      </Grid>
    </Grid>
  );
}
