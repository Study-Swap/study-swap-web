import React, { useState, MouseEvent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import EditChat from "./EditChat";
import IconButton from "@material-ui/core/Button";
import InfoIcon from "@material-ui/icons/Info";
import Popper from "@material-ui/core/Popper";
import Typography from "@material-ui/core/Typography";

import { chatsModel } from "../constants/Models";

const useStyles = makeStyles((theme) => ({
  name: {
    fontSize: 12,
    marginLeft: "15px",
  },
}));

interface ChatsToolbarProps {
  currentChat: chatsModel;
}

export default function ChatsToolbar2({ currentChat }: ChatsToolbarProps) {
  //get the ChatSelect working with the .map() function.
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <>
      <Grid item>
        <Typography className={classes.name}>
          {"To: " + currentChat.chatName}
        </Typography>
      </Grid>

      <Grid item>
        <IconButton
          aria-describedby={id}
          type="button"
          onClick={handleClick}
          disabled={currentChat.id == ""}
        >
          <InfoIcon />
        </IconButton>
        <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-end">
          <div>
            {" "}
            <EditChat
              currentChat={currentChat}
              handleClose={() => {
                setAnchorEl(null);
              }}
            />
          </div>
        </Popper>
      </Grid>
    </>
  );
}
