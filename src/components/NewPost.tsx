import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
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
    height: 160,
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
  const [value, setValue] = React.useState("");

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper component="form" className={classes.root}>
      <IconButton
        className={classes.iconButton}
        aria-label="menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>EECS 183</MenuItem>
        <MenuItem onClick={handleClose}>BIO 172</MenuItem>
        <MenuItem onClick={handleClose}>ENGR 100</MenuItem>
      </Menu>
      <InputBase
        className={classes.input}
        placeholder="Type a post..."
        inputProps={{ "aria-label": "post to feed" }}
        multiline={true}
        rowsMax={7}
        value={value}
        onChange={handleChange}
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