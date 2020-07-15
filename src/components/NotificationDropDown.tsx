import React, { useState, useEffect } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import NotificationItem from "./NotificationItems";
import { notificationModel } from "../constants/Models";
import { getNotifications } from "../utils/firebaseUtils";

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
  const [notificationData, setNotificationData] = useState<notificationModel[]>(
    []
  );

  useEffect(() => {
    getNotifications("12") // userId is hardcoded for now
      .then((res) => {
        setNotificationData(res);
      })
      .catch((err) => console.error(err));
  }, []);

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
                  {notificationData.map((nullNotif) => {
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
                        item={{
                          senderName,
                          notificationText,
                          timestamp,
                          read,
                          id,
                        }}
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
