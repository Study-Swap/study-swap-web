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

  chatTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },

  message: {
    display: "inline",
    fontSize: 14,
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
  const classes = useStyles();

  const [firstMessage, setFirstMessage] = useState<messageModel>({
    chatId: "",
    messageText:
      "This is me testing a longer message for rendering in cutting off the message",
    senderId: "",
    senderName: "Chintan Modi",
    senderProfilePic: "", // TODO: MAKE WORK
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
        onClick={() => onClick({ id, chatName })}
      >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>

        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.chatTitle}
                color="textPrimary"
                noWrap={true}
              >
                {chatName}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.message}
                color="textSecondary"
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
