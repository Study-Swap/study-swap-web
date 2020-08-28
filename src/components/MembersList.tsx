import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

interface nameAndId {
  memberName: string;
  memberId: string;
}

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
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Typography
        variant="subtitle2"
        style={{ fontSize: 12, fontWeight: "bold", color: "textSecondary" }}
      >
        {" "}
        MEMBERS LIST
      </Typography>
      <List style={{}} dense={true} disablePadding={true}>
        {props.currentMembers.map((member: nameAndId, index: number) => (
          <ListItem key={index}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Avatar
                className={classes.media}
                alt="Prof Pic"
                src={props.profilePicture}
              ></Avatar>

              <Typography
                variant="subtitle2"
                style={{ fontSize: 12, fontWeight: "bold" }}
              >
                {member.memberName}
              </Typography>

              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => props.onDelete(member)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
