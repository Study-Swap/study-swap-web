// eslint-disable-next-line
import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import NewChat from "../components/NewChat";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";

const useStyles = makeStyles((theme) => ({
  newChatModal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function ChatToolbar() {
  const classes = useStyles();

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <IconButton type="button" onClick={handleOpen}>
        <CreateIcon />
      </IconButton>
      <Modal
        className={classes.newChatModal}
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="chat-modal-title"
        aria-describedby="chat-modal-description"
      >
        <NewChat closeModal={handleClose} />
      </Modal>
    </>
  );
}

/* 

*/
