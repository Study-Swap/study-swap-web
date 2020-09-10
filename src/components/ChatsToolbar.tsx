// eslint-disable-next-line
import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import NewChat from "../components/NewChat";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/Button";
import GroupIcon from "@material-ui/icons/Group";
import PersonIcon from "@material-ui/icons/Person";
import NewDM from "../components/NewDM";

const useStyles = makeStyles((theme) => ({
  newChatModal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function ChatToolbar() {
  const classes = useStyles();

  const [groupOpen, setGroupOpen] = useState(false);

  const handleGroupOpen = () => {
    setGroupOpen(true);
  };

  const handleGroupClose = () => {
    setGroupOpen(false);
  };

  const [dmOpen, setDMOpen] = useState(false);

  const handleDMOpen = () => {
    setDMOpen(true);
  };

  const handleDMClose = () => {
    setDMOpen(false);
  };

  return (
    <div>
      <IconButton type="button" onClick={handleDMOpen}>
        <PersonIcon />
      </IconButton>
      <Modal
        className={classes.newChatModal}
        open={dmOpen}
        onClose={handleDMClose}
        aria-labelledby="chat-modal-title"
        aria-describedby="chat-modal-description"
      >
        <NewDM closeModal={handleDMClose} />
      </Modal>
      <IconButton type="button" onClick={handleGroupOpen}>
        <GroupIcon />
      </IconButton>
      <Modal
        className={classes.newChatModal}
        open={groupOpen}
        onClose={handleGroupClose}
        aria-labelledby="chat-modal-title"
        aria-describedby="chat-modal-description"
      >
        <NewChat closeModal={handleGroupClose} />
      </Modal>
    </div>
  );
}
