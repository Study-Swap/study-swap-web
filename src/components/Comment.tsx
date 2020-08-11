import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { commentModel } from "../constants/Models";
import Grid from "@material-ui/core/Grid";

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

  commentText: {
    backgroundColor: "#d1d1d1",
    borderRadius: "15px",
    paddingTop: "4px",
    paddingBottom: "4px",
    paddingLeft: "10px",
    paddingRight: "10px",
    display: "inline-block",
  },
}));

export default function Comment(props: commentModel) {
  const classes = useStyles();
  //const theme = useTheme();

  return (
    <Grid container item>
      <Grid item xs={1}>
        <Avatar
          className={classes.media}
          alt="Prof Pic"
          src={require("./apoorv.png")}
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
        <Typography className={classes.timestamp} color="textSecondary">
          {props.timestamp}
        </Typography>
      </Grid>
    </Grid>
  );
}
