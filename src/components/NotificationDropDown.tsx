import React from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { notificationTypes } from "../constants/notificationTypes";

import NotificationItem from "./NotificationItems";

const nullNotifList = [
  {
    id: "1",
    userId: "12", // points to user
    senderId: "23", // points to sender of notification
    senderName: "Akul Vijayvargiya",
    notificationText: "This is a short post",
    timestamp: "1/2/2020",
    read: false,
    kind: notificationTypes.TRENDING_POST,
  },
  {
    id: "2",
    userId: "12", // points to user
    senderId: "34", // points to sender of notification
    senderName: "Ashish Mahuli",
    notificationText:
      "This is a long post to see what will happen if the text is very long. Does the text wrap around and truncate after it passes a certain height?",
    timestamp: "1/2/2020",
    read: false,
    kind: notificationTypes.LIKE_COMMENT,
  },
  {
    id: "3",
    userId: "12", // points to user
    senderId: "23", // points to sender of notification
    senderName: "Akul Vijayvargiya",
    notificationText: "Hey Chintan! Lets chat",
    timestamp: "1/2/2020",
    read: false,
    kind: notificationTypes.NEW_CHAT,
  },
  {
    id: "4",
    userId: "12", // points to user
    senderId: "34", // points to sender of notification
    senderName: "Professor Mahuli",
    notificationText: "BIO 69",
    timestamp: "1/2/2020",
    read: false,
    kind: notificationTypes.ADMIN_ACCESS,
  },
  {
    id: "5",
    userId: "12", // points to user
    senderId: "23", // points to sender of notification
    senderName: "Akul Vijayvargiya",
    notificationText: "This is a short post",
    timestamp: "1/2/2020",
    read: true,
    kind: notificationTypes.LIKE_COMMENT,
  },
  {
    id: "6",
    userId: "12", // points to user
    senderId: "34", // points to sender of notification
    senderName: "Ashish Mahuli",
    notificationText:
      "This is a long post. This is a long post. This is a long post. This is a long post. This is a long post",
    timestamp: "1/2/2020",
    read: true,
    kind: notificationTypes.TRENDING_POST,
  },
];

interface NotificationDropDownProps {
  open: boolean;
  setOpen: Function;
  anchorRef: any;
}

const NotificationDropDown = ({
  open,
  setOpen,
  anchorRef,
}: NotificationDropDownProps) => {
  const classes = useStyles();
  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    console.log("clicked away");
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: "center top",
            }}
          >
            <ClickAwayListener onClickAway={handleClose}>
              <Paper className={classes.paper}>
                <>
                  <Typography variant="h5" className={classes.header}>
                    Notifications
                  </Typography>
                  {nullNotifList.map((nullNotif) => {
                    const {
                      id,
                      userId,
                      senderId,
                      senderName,
                      notificationText,
                      timestamp,
                      read,
                      kind,
                    } = nullNotif;
                    return (
                      <NotificationItem
                        key={id}
                        type={kind}
                        item={{ senderName, notificationText, timestamp, read }}
                      />
                    );
                  })}
                </>
              </Paper>
            </ClickAwayListener>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(1, 3),
    borderBottom: "solid",
    borderBottomColor: theme.palette.primary.main,
    borderBottomWidth: 0.5,
  },
  paper: {
    flex: 1,
    width: 400, // need to change this based on screen width
    height: 680, // need to change this based on screen width
    overflow: "auto",
  },
}));

export default NotificationDropDown;
