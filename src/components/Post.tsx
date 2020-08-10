import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

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

      <CardActions>
        <Button size="small">React</Button>
        <Button size="small">Comment</Button>
        <Button size="small" onClick={props.onClick}>
          Toggle Comments{" "}
        </Button>
      </CardActions>
    </React.Fragment>
    // </Card>
  );
}
