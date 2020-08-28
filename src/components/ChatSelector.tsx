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
    display: "inline-block",
    fontSize: 14,
    //overflow: "hidden",
    //textOverflow: "ellipsis",
    //width: "20%",
  },
}));

export default function ChatSelect({
  key,
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
    senderName: "Chintan Modi",
  });

  useEffect(() => {
    if (messages.length > 0) {
      getMessage(messages[messages.length - 1]) // classId is hardcoded for now
        .then((res) => {
          setFirstMessage(res);
          console.log(res);
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
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.message}
                color="textSecondary"
                //noWrap={true}
              >
                {shortenMessage(firstMessage.messageText)}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="fullWidth" component="li" />
    </React.Fragment>
  );
}
