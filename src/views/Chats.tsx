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
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import ChatSelect from "../components/ChatSelector";
import MessageBox from "../components/MessageBox";

import { chatsModel } from "../constants/Models";
import { dummyChatsData } from "../DummyData/chats";

// eslint-disable-next-line
import history from "../utils/historyUtils";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    flexDirection: "column",
    display: "flex",
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
  list: {
    maxHeight: 600,
    overflow: "auto",
  },
}));

export default function Chats() {
  //get the ChatSelect working with the .map() function.
  const [myChats, setMyChats] = useState(dummyChatsData);
  const classes = useStyles();
  const [currentChat, setCurrentChat] = useState("");
  const onClick = (value: string) => {
    setCurrentChat(value);
  };

  return (
    <Container component="main" maxWidth="md">
      <Grid container className={classes.root}>
        {dummyChatsData.map((thisChatSelector, index) => (
          <Grid item key={index}>
            <ChatSelect
              chatName={thisChatSelector.chatName}
              memberNames={thisChatSelector.memberNames}
              messages={thisChatSelector.messages}
              onClick={onClick}
            />
          </Grid>
        ))}
        <Grid item>
          <div>
            <MessageBox />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
