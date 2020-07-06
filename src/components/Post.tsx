import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { postModel } from "../constants/Models";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    minWidth: 400,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    fontSize: 12,
    marginBottom: 12,
  },
  media: {
    height: 50,
    width: 50,
  },
});

export default function Post(props: postModel) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container>
          <Grid item xs={2}>
            <CardMedia
              component="img"
              className={classes.media}
              src={require("./pic.jpg")}
              title="Profile Picture"
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
      <CardActions>
        <Button size="small">React</Button>
        <Button size="small">Comment</Button>
      </CardActions>
    </Card>
  );
}
