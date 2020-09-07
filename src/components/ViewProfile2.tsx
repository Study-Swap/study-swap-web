import React, { useState, MouseEvent } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ComputerIcon from "@material-ui/icons/Computer";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import history from "../utils/historyUtils";
import { logoutUser } from "../utils/firebaseUtils";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  pos: {
    fontSize: 20,
    marginBottom: 10,
  },
  media: {
    height: 150,
    width: 150,
  },
  userInfo: {
    marginLeft: 20,
  },
  button: {
    height: 40,
  },
});

interface ViewProfileProps {
  firstName: string;
  lastName: string;
  grade: string;
  bio: string;
  editingClick?: Function;
  classIds: string[];
  classNames: string[];
  setUser?: Function;
  profilePicture: string;
  messagingClick?: Function;
}

export default function ViewProfile({
  firstName,
  lastName,
  grade,
  bio,
  editingClick,
  classIds,
  classNames,
  setUser,
  profilePicture,
  messagingClick,
}: ViewProfileProps) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid container item xs={9}>
            <Grid container item direction="row" alignItems="flex-start">
              <Grid item xs={3}>
                <Avatar
                  className={classes.media}
                  alt={`${firstName} ${lastName}`}
                  src={profilePicture}
                />
              </Grid>
              <Grid item xs={9}>
                <div className={classes.userInfo}>
                  <Typography className={classes.title} gutterBottom>
                    {firstName} {lastName}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {grade}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    style={{ overflow: "auto" }}
                  >
                    {bio}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item xs={3} direction="column" alignItems="flex-end">
            <Grid item>
              {editingClick ? (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => {
                      editingClick();
                    }}
                  >
                    Edit Profile
                  </Button>
                  <IconButton aria-label="more-options" onClick={handleClick}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        if (setUser) {
                          logoutUser(setUser).then(() => {
                            history.push("/login");
                          });
                        }
                      }}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-end",
                      }}
                    >
                      <ExitToAppIcon />
                      <div style={{ fontSize: 15, marginLeft: 5 }}>Logout</div>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => {
                    if (messagingClick) messagingClick();
                  }}
                >
                  Message
                </Button>
              )}
            </Grid>
            <br />
            {classNames.map((name: string, index: number) => {
              return (
                <Grid item key={index}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-end",
                    }}
                  >
                    <ComputerIcon />
                    <Link
                      href={`/classes/${classIds[index]}`}
                      style={{ fontSize: 15, marginRight: 30, marginLeft: 5 }}
                    >
                      {name}
                    </Link>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
