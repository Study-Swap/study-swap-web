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
  pos: {
    fontSize: 12,
  },
  media: {
    height: 50,
    width: 50,
  },
}));

export default function Comment(props: commentModel) {
  const classes = useStyles();
  //const theme = useTheme();

  return (
    <Card className={classes.root}>
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
                <b>{props.commenterName}</b> {"   " + props.commentText}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {props.timestamp}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
