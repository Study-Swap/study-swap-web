import React, { useContext } from "react";
import { UserContext } from "../constants/UserContext";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },

  media: {
    height: 30,
    width: 30,
  },

  input: {
    //marginLeft: theme.spacing(2),
    backgroundColor: "#f0f0f0",
    flex: 1,
    overflow: "auto",
    fontSize: 14,
    width: "100%",
    borderRadius: "10px",
    padding: "10px",
  },
  iconButton: {
    //padding: 10,
  },
}));

interface NewCommentProps {
  value: string;
  onChange: Function;
  onClick: Function;
}

export default function NewComment({ value, onChange, onClick }: any) {
  // Context
  const { user, setUser } = useContext(UserContext);
  const classes = useStyles();

  return (
    <Grid container spacing={1} className={classes.root} alignItems="center">
      <Grid item xs={1}>
        <Avatar
          className={classes.media}
          alt={`${user.firstName}`}
          src={user.profilePicture}
        />
      </Grid>

      <Grid item xs={10}>
        <InputBase
          className={classes.input}
          placeholder="Type a Comment..."
          inputProps={{ "aria-label": "post to feed" }}
          multiline={true}
          rowsMax={7}
          value={value}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={1}>
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="Comment"
          onClick={onClick}
        >
          <SendIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
