import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SendIcon from "@material-ui/icons/Send";
import { normalize } from "path";
import { Autorenew } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 914,
    height: 70,
  },
  input: {
    marginLeft: theme.spacing(2),
    flex: 1,
    overflow: "auto",
  },
  iconButton: {
    padding: 10,
  },
}));

export default function CustomizedInputBase() {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Type a post..."
        inputProps={{ "aria-label": "post to feed" }}
        multiline={true}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="Send"
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
}
