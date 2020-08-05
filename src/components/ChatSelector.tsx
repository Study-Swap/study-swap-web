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

// eslint-disable-next-line
import history from "../utils/historyUtils";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    flexDirection: "row",
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
}));

export default function ChatSelect({
  key,
  id,
  chatName,
  memberNames,
  messages,
  onClick,
}: any) {
  //destructured the chatsModel so you can refer to them as just their name instead of props.name
  //Chatname can be used outright. memberNames as well.  You might have to get just the most recent
  //message from the messages array.  onClick should be passed from Chats.tsx as arrow function to change
  //some state, and then called from here by uncommenting out.

  const classes = useStyles();

  return (
    <React.Fragment>
      <ListItem
        alignItems="flex-start"
        className={classes.hover}
        onClick={() => onClick(id)}
      >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>

        <ListItemText
          primary={chatName}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Most Recent Texter
              </Typography>
              {" — Most recent text cut off to something like 50 characters"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="fullWidth" component="li" />
    </React.Fragment>
  );
}
