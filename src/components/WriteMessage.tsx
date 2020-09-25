import React, { useState, useContext } from "react";
import { UserContext } from "../constants/UserContext";

import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import ImageIcon from "@material-ui/icons/Image";
import SendIcon from "@material-ui/icons/Send";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

// TODO: https://www.gavsblog.com/blog/detect-single-and-multiple-keypress-events-javascript
// Make message go to next line using this logic

const useStyles = makeStyles((theme) => ({
  rootInput: {
    display: "flex",
    alignItems: "center",
    //height: "100%",
    width: "100%",
    paddingTop: 3,
    paddingBottom: 3,
  },
  input: {
    //marginLeft: theme.spacing(1),
    paddingLeft: "10px",
    flex: 1,
    backgroundColor: "white",
    borderRadius: "15px",
    //height: "70%",
    fontSize: 14,
  },
  iconButton: {
    padding: 10,
  },
  picInput: {
    display: "none",
  },
}));

interface writeMessageProps {
  submitMessage: Function;
  chatId: string | undefined;
}

export default function WriteMessage({
  submitMessage,
  chatId,
}: writeMessageProps) {
  // Context
  const { user, setUser } = useContext(UserContext);
  const classes = useStyles();

  const [value, setValue] = useState("");

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.rootInput}>
      <IconButton
        className={classes.iconButton}
        aria-label="image-menu"
        aria-haspopup="true"
        onClick={handleClick}
        disabled
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
        onKeyDown={(e) => {
          if (e.key === "Enter" && value !== "" && chatId !== "") {
            submitMessage({
              chatId: chatId,
              messageText: value,
              senderId: user.id,
              senderName: `${user.firstName} ${user.lastName}`,
              senderProfilePic: user.profilePicture,
            });
            setValue("");
          }
        }}
      />
      <IconButton
        //type="submit"
        className={classes.iconButton}
        aria-label="send"
        onClick={() => {
          submitMessage({
            chatId: chatId,
            messageText: value,
            senderId: user.id,
            senderName: `${user.firstName} ${user.lastName}`,
            senderProfilePic: user.profilePicture,
          });
          setValue("");
        }}
        disabled={value === "" || chatId == ""}
      >
        <SendIcon />
      </IconButton>
    </div>
  );
}
