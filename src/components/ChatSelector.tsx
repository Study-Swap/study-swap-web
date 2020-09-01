// eslint-disable-next-line
import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import { getMessage } from "../utils/firebaseUtils/chats";
import { messageModel } from "../constants/Models";

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
    display: "inline-block",
    fontSize: 14,
  },
}));

interface CHatSelectProps {
  picture: string;
  id: string;
  chatName: string;
  memberNames?: string[];
  messages: any[];
  onClick: Function;
  lastMessageTimestamp: any;
}

export default function ChatSelect({
  picture,
  id,
  chatName,
  memberNames,
  messages,
  onClick,
  lastMessageTimestamp,
}: any) {
  const classes = useStyles();

  const [firstMessage, setFirstMessage] = useState<messageModel>({
    chatId: "",
    messageText: "",
    senderId: "",
    senderName: "",
    senderProfilePic: "", // TODO: MAKE WORK
  });

  useEffect(() => {
    if (messages.length > 0) {
      getMessage(messages[messages.length - 1]) // classId is hardcoded for now
        .then((res) => {
          setFirstMessage(res);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  function shortenMessage(message: string) {
    if (message.length > 60) {
      return message.slice(0, 59) + " ...";
    } else {
      return message;
    }
  }

  return (
    <>
      <ListItem
        alignItems="flex-start"
        className={classes.hover}
        onClick={() => onClick({ id, chatName })}
      >
        <ListItemAvatar>
          <Avatar alt="Chat Picture" src={picture} />
        </ListItemAvatar>

        <ListItemText
          primary={
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                component="span"
                variant="body2"
                className={classes.chatTitle}
                color="textPrimary"
                style={{
                  width: "70%",
                  fontSize: 14,
                  marginRight: "5px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                noWrap={true}
              >
                {chatName}
              </Typography>
              <Typography
                component="span"
                variant="subtitle2"
                color="textSecondary"
                style={{ width: "30%", fontSize: 12 }}
                //noWrap={true}
              >
                {lastMessageTimestamp}
              </Typography>
            </div>
          }
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                className={classes.message}
                color="textSecondary"
                //noWrap={true}
              >
                {shortenMessage(firstMessage.messageText)}
              </Typography>
            </>
          }
        />
      </ListItem>
      <Divider variant="fullWidth" component="li" />
    </>
  );
}
