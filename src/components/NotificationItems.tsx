import React, { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { notificationTypes } from "../constants/notificationTypes";

const formatString = (text: string, maxSize: number): string => {
  return text.length > maxSize ? text.slice(0, maxSize) + "..." : text;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  readPaper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "98%",
    "&:hover": {
      backgroundColor: "#D3D3D3 !important",
    },
    maxHeight: 128,
  },
  unreadPaper: {
    backgroundColor: "#E1EAFF",
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "98%",
    "&:hover": {
      backgroundColor: "#A6C1FF !important",
    },
    maxHeight: 128,
  },
  profileImage: {
    width: 80,
    height: 80,
  },
  img: {
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "50%",
  },
  popper: {
    width: 210,
    padding: theme.spacing(1),
  },
  popperItem: {
    padding: theme.spacing(1),
    "&:hover": {
      backgroundColor: "#D3D3D3 !important",
    },
  },
}));

interface TrendingProps {
  senderName: string;
  notificationText: string;
  timestamp: string;
  read: boolean;
}

const TrendingPostNotification = ({
  senderName,
  notificationText,
  timestamp,
  read,
}: TrendingProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [notifRead, setNotifRead] = useState<boolean>(read);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className={classes.root}>
      <Paper
        className={notifRead ? classes.readPaper : classes.unreadPaper}
        elevation={0}
      >
        <Grid container spacing={2}>
          <Grid item>
            <div className={classes.profileImage}>
              <img
                className={classes.img}
                alt="profile pic"
                src={require("../DummyData/Headshot.png")}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs={11} container direction="column">
              <Grid item xs>
                <Typography gutterBottom variant="body2">
                  <strong>{senderName}'s</strong> post has been{" "}
                  <strong>trending</strong>:{" "}
                  {formatString(notificationText, 60)}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="body2" gutterBottom>
                  {timestamp}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <Popover
                id={open ? "notification-popup" : undefined}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Paper className={classes.popper}>
                  <Paper
                    className={classes.popperItem}
                    elevation={0}
                    onClick={() => {
                      setNotifRead(true);
                      setAnchorEl(null);
                    }}
                  >
                    Mark as Read
                  </Paper>
                  <Paper
                    className={classes.popperItem}
                    elevation={0}
                    onClick={handleClose}
                  >
                    Remove Notification
                  </Paper>
                  <Paper
                    className={classes.popperItem}
                    elevation={0}
                    onClick={handleClose}
                  >
                    Report to Notification Team
                  </Paper>
                </Paper>
              </Popover>
              <IconButton aria-label="more-options" onClick={handleClick}>
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

interface LikeCommentProps {
  senderName: string;
  notificationText: string;
  timestamp: string;
  read: boolean;
}

const LikeCommentNotification = ({
  senderName,
  notificationText,
  timestamp,
  read,
}: LikeCommentProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [notifRead, setNotifRead] = useState<boolean>(read);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className={classes.root}>
      <Paper
        className={notifRead ? classes.readPaper : classes.unreadPaper}
        elevation={0}
      >
        <Grid container spacing={2}>
          <Grid item>
            <div className={classes.profileImage}>
              <img
                className={classes.img}
                alt="profile pic"
                src={require("../DummyData/Headshot.png")}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs={11} container direction="column">
              <Grid item xs>
                <Typography gutterBottom variant="body2">
                  <strong>{senderName}</strong> <strong>liked</strong> your
                  post: {formatString(notificationText, 70)}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="body2" gutterBottom>
                  {timestamp}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <Popover
                id={open ? "notification-popup" : undefined}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Paper className={classes.popper}>
                  <Paper
                    className={classes.popperItem}
                    elevation={0}
                    onClick={() => {
                      setNotifRead(true);
                      setAnchorEl(null);
                    }}
                  >
                    Mark as Read
                  </Paper>
                  <Paper
                    className={classes.popperItem}
                    elevation={0}
                    onClick={handleClose}
                  >
                    Remove Notification
                  </Paper>
                  <Paper
                    className={classes.popperItem}
                    elevation={0}
                    onClick={handleClose}
                  >
                    Report to Notification Team
                  </Paper>
                </Paper>
              </Popover>
              <IconButton aria-label="more-options" onClick={handleClick}>
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

interface NewChatProps {
  senderName: string;
  chatText: string;
  timestamp: string;
  read: boolean;
}

const NewChatNotification = ({
  senderName,
  chatText,
  timestamp,
  read,
}: NewChatProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [notifRead, setNotifRead] = useState<boolean>(read);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className={classes.root}>
      <Paper
        className={notifRead ? classes.readPaper : classes.unreadPaper}
        elevation={0}
      >
        <Grid container spacing={2}>
          <Grid item>
            <div className={classes.profileImage}>
              <img
                className={classes.img}
                alt="profile pic"
                src={require("../DummyData/Headshot.png")}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs={11} container direction="column">
              <Grid item xs>
                <Typography gutterBottom variant="body2">
                  <strong>{senderName}</strong> sent you a{" "}
                  <strong>chat request</strong> with you:{" "}
                  {formatString(chatText, 60)}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="body2" gutterBottom>
                  {timestamp}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <Popover
                id={open ? "notification-popup" : undefined}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Paper className={classes.popper}>
                  <Paper
                    className={classes.popperItem}
                    elevation={0}
                    onClick={() => {
                      setNotifRead(true);
                      setAnchorEl(null);
                    }}
                  >
                    Mark as Read
                  </Paper>
                  <Paper
                    className={classes.popperItem}
                    elevation={0}
                    onClick={handleClose}
                  >
                    Remove Notification
                  </Paper>
                  <Paper
                    className={classes.popperItem}
                    elevation={0}
                    onClick={handleClose}
                  >
                    Approve Chat Request
                  </Paper>
                  <Paper
                    className={classes.popperItem}
                    elevation={0}
                    onClick={handleClose}
                  >
                    Mark User as Spam
                  </Paper>
                  <Paper
                    className={classes.popperItem}
                    elevation={0}
                    onClick={handleClose}
                  >
                    Report to Notification Team
                  </Paper>
                </Paper>
              </Popover>
              <IconButton aria-label="more-options" onClick={handleClick}>
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

interface AdminAccessProps {
  professorName: string;
  classname: string;
  timestamp: string;
  read: boolean;
}

const AdminAccessNotification = ({
  professorName,
  classname,
  timestamp,
  read,
}: AdminAccessProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [notifRead, setNotifRead] = useState<boolean>(read);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className={classes.root}>
      <Paper
        className={notifRead ? classes.readPaper : classes.unreadPaper}
        elevation={0}
      >
        <Grid item xs={12} sm container>
          <Grid item xs={11} container direction="column">
            <Grid item xs>
              <Typography gutterBottom variant="body2">
                <strong>{professorName}</strong> made you an{" "}
                <strong>admin</strong> for {classname}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="body2" gutterBottom>
                {timestamp}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <Popover
              id={open ? "notification-popup" : undefined}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Paper className={classes.popper}>
                <Paper
                  className={classes.popperItem}
                  elevation={0}
                  onClick={() => {
                    setNotifRead(true);
                    setAnchorEl(null);
                  }}
                >
                  Mark as Read
                </Paper>
                <Paper
                  className={classes.popperItem}
                  elevation={0}
                  onClick={handleClose}
                >
                  Remove Notification
                </Paper>
                <Paper
                  className={classes.popperItem}
                  elevation={0}
                  onClick={handleClose}
                >
                  Go to Class Page
                </Paper>
                <Paper
                  className={classes.popperItem}
                  elevation={0}
                  onClick={handleClose}
                >
                  Report to Notification Team
                </Paper>
              </Paper>
            </Popover>
            <IconButton aria-label="more-options" onClick={handleClick}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

interface NotificationItemProps {
  type: notificationTypes;
  item: any; // the item is passed in and vars are deconsructed based on type
}

export default function NotificationItem({
  type,
  item,
}: NotificationItemProps) {
  const { senderName, notificationText, timestamp, read } = item;
  switch (type) {
    case notificationTypes.TRENDING_POST:
      return (
        <TrendingPostNotification
          senderName={senderName}
          notificationText={notificationText}
          timestamp={timestamp}
          read={read}
        />
      );
    case notificationTypes.LIKE_COMMENT:
      return (
        <LikeCommentNotification
          senderName={senderName}
          notificationText={notificationText}
          timestamp={timestamp}
          read={read}
        />
      );
    case notificationTypes.NEW_CHAT:
      return (
        <NewChatNotification
          senderName={senderName}
          chatText={notificationText}
          timestamp={timestamp}
          read={read}
        />
      );
    case notificationTypes.ADMIN_ACCESS:
      return (
        <AdminAccessNotification
          professorName={senderName}
          classname={notificationText}
          timestamp={timestamp}
          read={read}
        />
      );
    default:
      return null;
  }
}
