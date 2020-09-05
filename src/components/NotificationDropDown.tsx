import React, { useState, useEffect, useContext, MouseEvent } from "react";
import { UserContext } from "../constants/UserContext";
import { useAuthEffect } from "../hooks/useAuthEffect";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import NotificationItem from "./NotificationItems";
import { notificationModel } from "../constants/Models";
import { getNotifications } from "../utils/firebaseUtils";
import useWindowDimensions from "../hooks/useWindowDimensions";

interface NotificationDropDownProps {
  open: boolean;
  setOpen: Function;
  anchorRef: any;
  setNumNotifs: Function;
}

const NotificationDropDown = ({
  open,
  setOpen,
  anchorRef,
  setNumNotifs,
}: NotificationDropDownProps) => {
  // Context
  const { user, setUser } = useContext(UserContext);

  const classes = useStyles();
  const [notificationData, setNotificationData] = useState<notificationModel[]>(
    []
  );
  const { innerWidth, innerHeight } = useWindowDimensions();

  useEffect(() => {
    if (user.id)
      getNotifications(user.id) // userId is hardcoded for now
        .then((res) => {
          setNotificationData(res);
          setNumNotifs(res.filter((notif: any) => notif.read).length);
        })
        .catch((err) => console.error(err));
  }, []);

  const handleClose = (event: MouseEvent<EventTarget>) => {
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
        <Grow
          style={{
            transformOrigin: "center top",
          }}
        >
          <ClickAwayListener onClickAway={handleClose}>
            <Paper
              className={classes.paper}
              style={{
                width: innerWidth > 800 ? innerWidth * 0.35 : innerWidth * 0.95,
                height: innerHeight * 0.85,
              }}
            >
              <>
                <Typography variant="h5" className={classes.header}>
                  Notifications
                </Typography>
                {notificationData.length === 0 ? (
                  <Typography variant="body2" className={classes.header}>
                    You Have no Notifications
                  </Typography>
                ) : (
                  notificationData.map((nullNotif) => {
                    const {
                      id,
                      // eslint-disable-next-line
                      userId,
                      // eslint-disable-next-line
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
                  })
                )}
              </>
            </Paper>
          </ClickAwayListener>
        </Grow>
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
    overflow: "auto",
  },
}));

export default NotificationDropDown;
