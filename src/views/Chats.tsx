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
import WriteMessage from "../components/WriteMessage";

import { chatsModel } from "../constants/Models";
import { dummyChatsData } from "../DummyData/chats";

// eslint-disable-next-line
import history from "../utils/historyUtils";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  topbar: {
    width: "100%",
    height: "60px",
    backgroundColor: "blue", //change to theme
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
}));

export default function Chats() {
  //get the ChatSelect working with the .map() function.
  const [myChats, setMyChats] = useState(dummyChatsData);
  const classes = useStyles();
  const [currentChat, setCurrentChat] = useState<string>("1");
  const onClick = (value: string) => {
    setCurrentChat(value);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const [modalOpen, setModalOpen] = React.useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <Container component="main" maxWidth="md">
      <Grid container className={classes.root}>
        <Grid container item direction="column" md={4}>
          {dummyChatsData.map((thisChatSelector, index) => (
            <Grid item key={index}>
              <ChatSelect
                //we are putting a ListItem in a grid item in a grid contianer instead of list. is this sus
                id={thisChatSelector.id}
                chatName={thisChatSelector.chatName}
                memberNames={thisChatSelector.memberNames}
                messages={thisChatSelector.messages}
                onClick={onClick}
              />
            </Grid>
          ))}
        </Grid>
        <Grid item md={8}>
          <Grid
            container
            className={classes.root}
            direction="column"
            spacing={2}
          >
            <MessageBox chatId={currentChat} />
          </Grid>
          <Grid
            container
            className={classes.root}
            direction="column-reverse"
            justify="flex-start"
          >
            <WriteMessage />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

/* 
<Grid container className={classes.topbar} spacing={3}>
        <Grid item xs={2}></Grid>

        <Grid item xs={1}>
          <IconButton type="button" onClick={handleOpen}>
            <CreateIcon />
          </IconButton>
          <Modal
            className={classes.newChatModal}
            open={modalOpen}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <NewChat />
          </Modal>
        </Grid>

        <Grid item xs={8}></Grid>

        <Grid item xs={1}>
          <IconButton aria-describedby={id} type="button" onClick={handleClick}>
            <InfoIcon />
          </IconButton>
          <Popper
            id={id}
            open={open}
            anchorEl={anchorEl}
            placement="bottom-end"
          >
            <div>
              {" "}
              <EditChat />
            </div>
          </Popper>
*/
