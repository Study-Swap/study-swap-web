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
import Grid from "@material-ui/core/Grid";

// eslint-disable-next-line
import history from "../utils/historyUtils";
import { dummyMessagesData1, dummyMessagesData2 } from "../DummyData/chats";
import { StringifyOptions } from "querystring";
import { ExecOptionsWithStringEncoding } from "child_process";
import { messageModel } from "../constants/Models";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    maxHeight: 600,
  },
  chatSide: {
    maxWidth: "36ch",
    borderRight: "solid",
    borderRightWidth: 1,
    borderRightColor: "#D9D9D9",
  },
  inline: {
    display: "inline",
  },
  hover: {
    "&:hover": {
      backgroundColor: "#D3D3D3 !important",
    },
  },
  media: {
    height: "40px",
    width: "40px",
  },
}));

export default function ChatSelect(chatId: any) {
  useEffect(() => {
    if (chatId.chatId == 1) {
      //chatId is the passed state variable. Is an object (weird)
      setMessageArray(dummyMessagesData1);
    } else if (chatId.chatId == 2) {
      setMessageArray(dummyMessagesData2);
    }
  }); //if you want to only run on first render, add [] as second arg
  //https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once

  const classes = useStyles();

  const [messageArray, setMessageArray] = useState<messageModel[]>(
    dummyMessagesData1
  );
  const userID = "12";

  function isUser(senderID: string) {
    if (userID == senderID) return "flex-end";
    else return "flex-start";
  }

  return (
    <Grid container className={classes.root} direction="column" spacing={4}>
      {messageArray.map((thisMessage, index) => (
        <Grid container item justify={isUser(thisMessage.senderId)}>
          <Grid item>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              className={classes.media}
            />
          </Grid>

          <Grid item>
            <Typography gutterBottom>{thisMessage.messageText}</Typography>
            <Typography color="textSecondary">
              {thisMessage.timestamp}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
