import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ImageIcon from "@material-ui/icons/Image";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  rootInput: {
    border: "solid",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  picInput: {
    display: "none",
  },
}));

export default function NewChat() {
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
    <Grid item>
      <Paper component="form" className={classes.rootInput}>
        <IconButton
          className={classes.iconButton}
          aria-label="image-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <ImageIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Take a picture</MenuItem>
          <input
            accept="image/*"
            className={classes.picInput}
            id="contained-button-file"
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <MenuItem onClick={handleClose}>Choose from Camera Roll</MenuItem>
          </label>
        </Menu>
        <InputBase
          className={classes.input}
          placeholder="Type a message..."
          inputProps={{ "aria-label": "Type a message..." }}
          multiline={true}
          rowsMax={7}
          value={value}
          onChange={handleChange}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="send"
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Grid>
  );
}
