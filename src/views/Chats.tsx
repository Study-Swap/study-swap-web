import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import { chatsModel } from "../constants/Models";

const dummyChatsData: Array<chatsModel> = [
  {
    id: "1",
    chatName: "Chat 1",
    members: ["12", "23"],
    memberNames: ["Chintan Modi", "Ashish Mahuli"],
    messages: [],
  },
  {
    id: "2",
    chatName: "Chat 2",
    members: ["12", "56"],
    memberNames: ["Chintan Modi", "Nick Smith"],
    messages: [],
  },
  {
    id: "3",
    chatName: "Chat 3",
    members: ["12", "34"],
    memberNames: ["Chintan Modi", "Akul Vijayvargiya"],
    messages: [],
  },
  {
    id: "4",
    chatName: "Chat 4",
    members: ["12", "23", "34"],
    memberNames: ["Chintan Modi", "Ashish Mahuli", "Akul Vijayvargiya"],
    messages: [],
  },
];

export default function Chats() {
  const classes = useStyles();
  const [userId, setUserId] = useState("12");

  return (
    <Container component="main" maxWidth="sm" className={classes.container}>
      <h2 className={classes.header}>My Chats</h2>
      {dummyChatsData.map((item: chatsModel) => {
        return (
          <Paper elevation={2} key={item.id} className={classes.paper}>
            <div>ChatName: {item.chatName}</div>
            <div>
              Members: {item.memberNames[0]} {item.memberNames[1]}{" "}
              {item.memberNames.length > 2 ? item.memberNames[2] : ""}
            </div>
          </Paper>
        );
      })}
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
  header: {
    alignSelf: "center",
  },
}));
