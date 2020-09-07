import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import HelpIcon from "@material-ui/icons/Help";
import history from "../utils/historyUtils";
import NotificationDropDown from "./NotificationDropDown";

import {
  Menu as MenuIcon,
  AccountCircleRounded as AccountIcon,
  NotificationsRounded as NotificationIcon,
  Search as SearchIcon,
} from "@material-ui/icons";

interface AppToolbarProps {
  classes: any;
  title: string;
  toggleDrawer: Function;
  profilePic: string;
}

const AppToolbar = ({
  classes,
  title,
  toggleDrawer,
  profilePic,
}: AppToolbarProps) => {
  const [open, setOpen] = useState(false);
  const [numNotifs, setNumNotifs] = useState<number>(0);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <AppBar position="fixed" className={clsx(classes.appBar)} color="secondary">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          onClick={toggleDrawer(true)}
          color="inherit"
          aria-label="open drawer"
        >
          <MenuIcon />
        </IconButton>
        {/*<Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          {title}
        </Typography>*/}
        <img
          src={require("../constants/StudySwapLogo.jpeg")}
          style={{ height: 45, width: 160 }}
          onClick={() => {
            history.push("/home");
          }}
        />
        <div className={classes.title} />
        <IconButton
          onClick={() => {
            history.push("/help");
          }}
          color="inherit"
        >
          <HelpIcon />
        </IconButton>
        <NotificationDropDown
          open={open}
          setOpen={setOpen}
          anchorRef={anchorRef}
          setNumNotifs={setNumNotifs}
        />
        <IconButton
          color="inherit"
          ref={anchorRef}
          aria-controls={open ? "notification-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          {numNotifs > 0 ? (
            <Badge badgeContent={numNotifs} color="error">
              <NotificationIcon />
            </Badge>
          ) : (
            <NotificationIcon />
          )}
        </IconButton>
        <IconButton color="inherit" component={Link} to={"/profile"}>
          {profilePic ? (
            <Avatar alt="Profile" src={profilePic} />
          ) : (
            <AccountIcon />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
