import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import ImageIcon from "@material-ui/icons/Image";
import SendIcon from "@material-ui/icons/Send";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  rootInput: {
    border: "outlined",
    display: "flex",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

interface writeMessageProps {
  submitMessage: Function;
}

export default function NewChat({ submitMessage }: writeMessageProps) {
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
        <MenuItem onClick={handleClose}>Choose from Camera Roll</MenuItem>
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
        //type="submit"
        className={classes.iconButton}
        aria-label="send"
        onClick={() => {
          submitMessage({
            //hard coded to test if new message sent
            chatId: "9yWHYYczrMViTQwfG3F7",
            messageText: value,
            senderId: "12",
            senderName: "Akul",
          });
          setValue("");
        }}
        disabled={value === ""}
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
}
