import React, { useState, useContext } from "react";
import { UserContext } from "../constants/UserContext";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import ShareIcon from "@material-ui/icons/Share";
import history from "../utils/historyUtils";

import { addLike, removeLike, sendLike } from "../utils/firebaseUtils";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },

  title: {
    fontSize: 14,
    fontWeight: "bold",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  pos: {
    fontSize: 12,
    marginBottom: 12,
  },
  media: {
    height: 45,
    width: 45,
  },
  button: {
    height: "100%",
    width: "30%",
  },
  buttonDivider: {
    marginLeft: "10px",
  },
  tag: {
    fontSize: 11,
    fontWeight: "bold",
    backgroundColor: "#E3E3E3",
    borderRadius: "40px",
    padding: "2px 6px 2px 6px", //top right bottom left
  },
});

interface PostProps {
  isLiked: boolean;
  likedBy: string[];
  id: string | undefined;
  postUserName: string;
  profilePic: string;
  timestamp: string;
  postCategory: string;
  postText: string;
  commentsShown: boolean;
  onToggleClick: Function;
  postClassName?: string;
  classId?: string;
  edited?: boolean;
  userId: string;
  numberComments: number;
}

export default function Post({
  isLiked,
  likedBy,
  id,
  postUserName,
  profilePic,
  timestamp,
  postCategory,
  postText,
  commentsShown,
  onToggleClick,
  postClassName,
  edited,
  classId,
  userId,
  numberComments,
}: PostProps) {
  // Context
  const { user, setUser } = useContext(UserContext);

  const classes = useStyles();
  const [likeState, setLikeState] = useState(isLiked);
  const [lengthState, setLengthState] = useState(likedBy.length);

  function hitLike() {
    setLikeState(true);
    if (id) {
      addLike(id, user.id);
      setLengthState(lengthState + 1);
      sendLike({
        userId: user.id,
        senderName: `${user.firstName} ${user.lastName}`,
        notificationText: postText,
        profilePicture: user.profilePicture,
      });
    }
  }

  function hitUnlike() {
    setLikeState(false);
    if (id) {
      removeLike(id, user.id);
      setLengthState(lengthState - 1);
    }
  }

  const UserHasLiked = () => {
    if (likeState) {
      return (
        <Button
          startIcon={<ThumbUpIcon />}
          className={classes.button}
          size="small"
          onClick={hitUnlike}
        >
          Unlike {lengthState !== 0 ? lengthState : ""}
        </Button>
      );
    } else {
      return (
        <Button
          startIcon={<ThumbUpAltOutlinedIcon />}
          className={classes.button}
          size="small"
          onClick={hitLike}
        >
          Like {lengthState !== 0 ? lengthState : ""}
        </Button>
      );
    }
  };
  return (
    <>
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item style={{ display: "flex" }}>
            <Avatar
              className={classes.media}
              alt={postUserName}
              src={profilePic}
            />

            <div style={{ display: "block", marginLeft: "8px" }}>
              <Typography
                onClick={() =>
                  history.push({
                    pathname: "/profile",
                    state: { userId: userId },
                  })
                }
                className={classes.title}
              >
                {postUserName}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {timestamp}
              </Typography>
            </div>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" className={classes.tag}>
              {postCategory}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="body2" component="p">
          {postText}
        </Typography>
      </CardContent>

      <Divider className={classes.buttonDivider} />
      <CardActions style={{ justifyContent: "center" }}>
        <UserHasLiked />
        <Button
          startIcon={
            commentsShown ? (
              <ChatBubbleIcon />
            ) : (
              <ChatBubbleOutlineOutlinedIcon />
            )
          }
          className={classes.button}
          size="small"
          onClick={() => onToggleClick()}
        >
          Comments {numberComments !== 0 ? numberComments : ""}
        </Button>
        <Button
          startIcon={<ShareIcon />}
          className={classes.button}
          size="small"
          disabled
        >
          Share
        </Button>
      </CardActions>
      <Divider className={classes.buttonDivider} />
    </>
  );
}
