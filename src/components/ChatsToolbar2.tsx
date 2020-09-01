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
import EditChat from "./EditChat";
import NewChat from "./NewChat";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import InfoIcon from "@material-ui/icons/Info";
import Popper from "@material-ui/core/Popper";

import ChatSelect from "./ChatSelector";
import MessageBox from "./MessageBox";
import WriteMessage from "./WriteMessage";

import { chatsModel } from "../constants/Models";

// eslint-disable-next-line
import history from "../utils/historyUtils";
import { Autorenew } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  name: {
    fontSize: 12,
    marginLeft: "15px",
    //fontWeight: "bold"
  },
}));

export default function ChatsToolbar2(props: any) {
  //get the ChatSelect working with the .map() function.
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <React.Fragment>
      <Grid item>
        <Typography className={classes.name}>
          {"To: " + props.currentChat.chatName}
        </Typography>
      </Grid>

      <Grid item>
        <IconButton aria-describedby={id} type="button" onClick={handleClick}>
          <InfoIcon />
        </IconButton>
        <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-end">
          <div>
            {" "}
            <EditChat currentChat={props.currentChat} />
          </div>
        </Popper>
      </Grid>
    </React.Fragment>
  );
}
