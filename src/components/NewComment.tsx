import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },

  media: {
    height: 30,
    width: 30,
  },

  input: {
    //marginLeft: theme.spacing(2),
    backgroundColor: "#d1d1d1",
    flex: 1,
    overflow: "auto",
    fontSize: 14,
    width: "100%",
    borderRadius: "10px",
    padding: "10px",
  },
  iconButton: {
    //padding: 10,
  },
}));

export default function NewComment(props: any) {
  const classes = useStyles();

  return (
    <Grid container spacing={1} className={classes.root} alignItems="center">
      <Grid item xs={1}>
        <Avatar
          className={classes.media}
          alt="Prof Pic"
          src={require("./apoorv.png")}
        />
      </Grid>

      <Grid item xs={10}>
        <InputBase
          className={classes.input}
          placeholder="Type a Comment..."
          inputProps={{ "aria-label": "post to feed" }}
          multiline={true}
          rowsMax={7}
          value={props.value}
          onChange={props.onChange}
        />
      </Grid>
      <Grid item xs={1}>
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
  );
}
