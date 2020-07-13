import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { commentModel } from "../constants/Models";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },

  media: {
    height: 50,
    width: 50,
  },

  input: {
    //marginLeft: theme.spacing(2),
    flex: 1,
    fontSize: 14,
  },
  iconButton: {
    padding: 10,
  },
}));

export default function NewComment(props: any) {
  const classes = useStyles();
  const theme = useTheme();

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
            <InputBase
              className={classes.input}
              placeholder="Type a Comment..."
              inputProps={{ "aria-label": "post to feed" }}
              value={props.value}
              onChange={props.onChange}
            />

            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="Comment"
              onClick={props.onClick}
            >
              <SendIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
