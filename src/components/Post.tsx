import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
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
import { render } from "@testing-library/react";
import { addLike, removeLike } from "../utils/firebaseUtils/posts";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },

  title: {
    fontSize: 14,
    fontWeight: "bold",
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

export default function Post(props: any) {
  const classes = useStyles();
  const [likeState, setLikeState] = React.useState(props.isLiked);
  const [lengthState, setLengthState] = React.useState(props.likedBy.length);
  //hard coded userId for now

  function hitLike() {
    setLikeState(true);
    addLike(props.id, "1111");
    setLengthState(lengthState + 1);
  }

  function hitUnlike() {
    setLikeState(false);
    removeLike(props.id, "1111");
    setLengthState(lengthState - 1);
  }

  function UserHasLiked(props: any) {
    if (likeState) {
      return (
        <Button
          startIcon={<ThumbUpIcon />}
          className={classes.button}
          size="small"
          onClick={hitUnlike}
        >
          Unlike {lengthState}
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
          Like {lengthState}
        </Button>
      );
    }
  }
  return (
    //<Card className={classes.root}>

    <React.Fragment>
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item style={{ display: "flex" }}>
            <Avatar
              className={classes.media}
              alt="Prof Pic"
              src={require("./apoorv.png")}
            />

            <div style={{ display: "block", marginLeft: "8px" }}>
              <Typography className={classes.title} gutterBottom>
                {props.postUserName}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {props.timestamp}
              </Typography>
            </div>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" className={classes.tag}>
              {props.postCategory}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="body2" component="p">
          {props.postText}
        </Typography>
      </CardContent>

      <Divider className={classes.buttonDivider} />
      <CardActions style={{ justifyContent: "center" }}>
        <UserHasLiked />
        <Button
          startIcon={<ChatBubbleIcon />}
          className={classes.button}
          size="small"
          onClick={props.onClick}
        >
          Toggle
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
    </React.Fragment>
    // </Card>
  );
}
