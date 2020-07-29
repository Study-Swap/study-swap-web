import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
  },

  media: {
    height: "30px",
    width: "30px",
  },
  currentMember: {
    width: "100%",
  },
}));

export default function MembersList(props: any) {
  const classes = useStyles();

  return (
    <React.Fragment>
      {props.currentMembers.map((memberName: string, index: number) => (
        <Grid
          item
          container
          key={index}
          spacing={1}
          className={classes.currentMember}
        >
          <Grid item>
            <Avatar
              className={classes.media}
              alt="Prof Pic"
              src={require("./apoorv.png")}
            />
          </Grid>
          <Grid item>
            <Typography color="textPrimary" variant="subtitle2">
              {memberName}
            </Typography>
          </Grid>

          <Grid item>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </React.Fragment>
  );
}
