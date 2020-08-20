// eslint-disable-next-line
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../constants/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";

import ChatSelect from "../components/ChatSelector";
import MessageBox from "../components/MessageBox";
import ChatsToolbar from "../components/ChatsToolbar";
import ChatsToolbar2 from "../components/ChatsToolbar2";
import WriteMessage from "../components/WriteMessage";

import { chatsModel, messageModel } from "../constants/Models";
import { dummyChatsData } from "../DummyData/chats";
import { getChats, addMessages } from "../utils/firebaseUtils";

// eslint-disable-next-line
import history from "../utils/historyUtils";
import { Autorenew } from "@material-ui/icons";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
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
  topbarLeft: {
    height: 50,
    //backgroundColor: "red", //change to theme
    alignItems: "center",
    justifyContent: "flex-end",
  },

  topbarRight: {
    height: 50,
    backgroundColor: "#f0f0f0", //change to theme
    alignItems: "center",
    justifyContent: "space-between",
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
  leftSide: {
    backgroundColor: "#dedcdf",
  },

  list: {
    height: "100%",
    overflow: "auto",
  },
}));

const tempUserId = "7k1MF9w490XOeFH5ygGY";

export default function Chats() {
  //get the ChatSelect working with the .map() function.
  const [myChats, setMyChats] = useState<chatsModel[]>([]);
  const [myMessage, setMyMessage] = useState<messageModel[]>([]);
  const classes = useStyles();
  const [currentChatId, setCurrentChatId] = useState<string>("");
  const [currentChatName, setCurrentChatName] = useState<string>("");
  const onClick = ({ id, chatName }: any) => {
    setCurrentChatId(id);
    setCurrentChatName(chatName);
  };

  useEffect(() => {
    getChats(tempUserId) // userId is hardcoded for now
      .then((res) => {
        console.log(res);
        setMyChats(res);
        console.log("loading chats");
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container component="main" maxWidth="md">
      <div style={{ justifyContent: "center", display: "flex" }}>
        <Grid container className={classes.root}>
          {" "}
          {/*top level horizontal grid*/}
          <Grid
            container
            sm={4}
            item
            direction="column"
            className={classes.leftSide}
          >
            {" "}
            {/*left side of view*/}
            <Grid item container className={classes.topbarLeft}>
              <Grid item>
                <ChatsToolbar />
              </Grid>
            </Grid>
            <Divider />
            <Grid item style={{ height: 400 }}>
              {" "}
              {/*Grid item to hold <List> of <chatSelect> listItems*/}
              <List className={classes.list}>
                {myChats.map((thisChatSelector, index) => (
                  <React.Fragment key={thisChatSelector.id}>
                    <ChatSelect
                      id={thisChatSelector.id}
                      chatName={thisChatSelector.chatName}
                      memberNames={thisChatSelector.memberNames}
                      messages={thisChatSelector.messages}
                      onClick={onClick}
                    />
                  </React.Fragment>
                ))}
              </List>
            </Grid>
          </Grid>
          <Grid container sm={8} item direction="column">
            {" "}
            {/*right side of view*/}
            <Grid item container className={classes.topbarRight}>
              <ChatsToolbar2 chatName={currentChatName} />
            </Grid>
            <Divider />
            <Grid // all the messages rendered in this at Grid items in MessageBox
              item
              container
              className={classes.rootChat}
              direction="row"
              alignContent="flex-start"
              spacing={0}
            >
              <MessageBox chatId={currentChatId} />
            </Grid>
            <Divider />
            <Grid item style={{ height: 40, backgroundColor: "#f0f0f0" }}>
              <WriteMessage
                chatId={currentChatId}
                submitMessage={(message: messageModel) => {
                  //setMyMessage([message, ...myMessage]);
                  addMessages(message);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
