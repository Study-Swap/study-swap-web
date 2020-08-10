// eslint-disable-next-line
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../constants/UserContext";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { getMessage } from "../utils/firebaseUtils/chats";
import { messageModel } from "../constants/Models";

// eslint-disable-next-line
import history from "../utils/historyUtils";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    flexDirection: "row",
    display: "flex",
    maxHeight: 600,
  },
  chatSide: {
    maxWidth: "36ch",
    borderRight: "solid",
    borderRightWidth: 1,
    borderRightColor: "#D9D9D9",
  },

  hover: {
    "&:hover": {
      backgroundColor: "#D3D3D3 !important",
    },
  },

  inline: {
    display: "inline",
  },
}));

export default function ChatSelect({
  key,
  id,
  chatName,
  memberNames,
  messages,
  onClick,
}: any) {
  //destructured the chatsModel so you can refer to them as just their name instead of props.name
  //Chatname can be used outright. memberNames as well.  You might have to get just the most recent
  //message from the messages array.  onClick should be passed from Chats.tsx as arrow function to change
  //some state, and then called from here by uncommenting out.

  const classes = useStyles();

  const [firstMessage, setFirstMessage] = useState<messageModel>({
    chatId: "",
    messageText:
      "This is me testing a longer message for rendering in cutting off the message",
    senderId: "",
    senderName: "Chintan Modi",
  });

  useEffect(() => {
    if (messages !== undefined && messages.size > 0) {
      getMessage(messages[0]) // classId is hardcoded for now
        .then((res) => {
          setFirstMessage(res);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <React.Fragment>
      <ListItem
        alignItems="flex-start"
        className={classes.hover}
        onClick={() => onClick(id)}
      >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>

        <ListItemText
          primary={chatName}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
                //noWrap = {true}
              >
                {firstMessage.messageText}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="fullWidth" component="li" />
    </React.Fragment>
  );
}
