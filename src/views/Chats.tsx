// eslint-disable-next-line
import React, { useState, useContext } from "react";
import { UserContext } from "../constants/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Card from "@material-ui/core/Card";
import EditChat from "../components/EditChat";
import NewChat from "../components/NewChat";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import InfoIcon from "@material-ui/icons/Info";
import Popper from "@material-ui/core/Popper";

import ChatSelect from "../components/ChatSelector";
import MessageBox from "../components/MessageBox";
import ChatsToolbar from "../components/ChatsToolbar";
import WriteMessage from "../components/WriteMessage";

import { chatsModel } from "../constants/Models";
import { dummyChatsData } from "../DummyData/chats";

// eslint-disable-next-line
import history from "../utils/historyUtils";
import { Autorenew } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    height: 450,
  },
  rootChat: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    height: 360,
    overflow: "auto",
  },

  inline: {
    display: "inline",
  },
  topbar: {
    width: "100%",
    height: 50,
    backgroundColor: "blue", //change to theme
    alignItems: "center",
  },
  newChatModal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    //might switch to:
    //position: fixed;
    //top: 50%;
    //left: 50%;
    //transform: translate(-50%, -50%);
  },

  list: {
    height: "100%",
    overflow: "auto",
  },
}));

export default function Chats() {
  //get the ChatSelect working with the .map() function.
  const [myChats, setMyChats] = useState(dummyChatsData);
  const classes = useStyles();
  const [currentChat, setCurrentChat] = useState<string>("1");
  const onClick = (value: string) => {
    setCurrentChat(value);
  };

  const myNums = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
  ];

  return (
    <Container component="main" maxWidth="md">
      <Grid container className={classes.root}>
        <Grid container item sm={12} className={classes.topbar}>
          <ChatsToolbar />
        </Grid>
        <Grid container item direction="column" sm={4} style={{ height: 400 }}>
          <List className={classes.list}>
            {dummyChatsData.map((thisChatSelector, index) => (
              <ChatSelect
                //we are putting a ListItem in a grid item in a grid contianer instead of list. is this sus
                key={index}
                id={thisChatSelector.id}
                chatName={thisChatSelector.chatName}
                memberNames={thisChatSelector.memberNames}
                messages={thisChatSelector.messages}
                onClick={onClick}
              />
            ))}
          </List>
        </Grid>

        <Grid item container sm={8} direction="column">
          <Grid
            item
            container
            className={classes.rootChat}
            direction="row"
            spacing={0}
          >
            <MessageBox />
          </Grid>

          <Grid item style={{ height: 40 }}>
            <WriteMessage />
          </Grid>
        </Grid>
      </Grid>

      <br></br>
      <br></br>
      <br></br>
      <Grid
        item
        container
        className={classes.rootChat}
        direction="column"
        spacing={0}
      >
        {myNums.map((thisNum, index) => (
          <p>{thisNum}</p>
        ))}
      </Grid>
    </Container>
  );
}
