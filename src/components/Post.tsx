import React from "react";
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
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ShareIcon from "@material-ui/icons/Share";

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
});

export default function Post(props: any) {
  const classes = useStyles();

  return (
    //<Card className={classes.root}>

    <React.Fragment>
      <CardContent>
        <Grid container>
          <Grid item xs={2}>
            <Avatar
              className={classes.media}
              alt="Prof Pic"
              src={require("./apoorv.png")}
            />
          </Grid>

          <Grid item xs={9}>
            <div>
              <Typography className={classes.title} gutterBottom>
                {props.postUserName} in {props.postClassName}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {props.timestamp}
              </Typography>
            </div>
          </Grid>
        </Grid>

        <Typography variant="body2" component="p">
          {props.postText}
        </Typography>
      </CardContent>

      <Divider className={classes.buttonDivider} />
      <CardActions style={{ justifyContent: "center" }}>
        <Button
          startIcon={<ThumbUpIcon />}
          className={classes.button}
          size="small"
        >
          Like {props.numLikes}
        </Button>
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
