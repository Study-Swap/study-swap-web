// eslint-disable-next-line
import React, { useState, useContext } from "react";
import { UserContext } from "../constants/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import EditChat from "../components/EditChat";
import NewChat from "../components/NewChat";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import InfoIcon from "@material-ui/icons/Info";
import Popper from "@material-ui/core/Popper";

// eslint-disable-next-line
import history from "../utils/historyUtils";

const useStyles = makeStyles((theme) => ({
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
  // eslint-disable-next-line
  const classes = useStyles();

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
        </Grid>
      </Grid>
    </Container>
  );
}
