import React, { useContext } from "react";
import { UserContext } from "../constants/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { commentModel } from "../constants/Models";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
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
    //fontWeight: "regular"
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

export default function Comment(props: any) {
  // Context
  const { user, setUser } = useContext(UserContext);

  const classes = useStyles();
  const [likeState, setLikeState] = React.useState(props.commentLiked);
  const [lengthState, setLengthState] = React.useState(props.likedBy.length);
  //const theme = useTheme();

  function plusLike() {
    props.onLike(props.index, likeState);
    setLikeState(true);
    addCommentLike(props.id, user.id);
    setLengthState(lengthState + 1);
  }

  function minusLike() {
    props.onLike(props.index, likeState);
    setLikeState(false);
    removeCommentLike(props.id, user.id);
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
          alt={props.commenterName}
          src={props.profilePic}
        />
      </Grid>

      <Grid item xs={9}>
        <div className={classes.commentText}>
          <Typography className={classes.title}>
            <b>{props.commenterName}</b>
          </Typography>
          <Typography className={classes.title} gutterBottom>
            {props.commentText}
          </Typography>
        </div>
        <HasLiked />
        <Typography className={classes.timestamp} color="textSecondary">
          {props.timestamp}
        </Typography>
      </Grid>
    </Grid>
  );
}
