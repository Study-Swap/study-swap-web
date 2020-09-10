import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import { nameAndId } from "../constants/types/rosterTypes";

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

interface MembersListProps {
  currentMembers: any[];
  onDelete: Function;
  titleText: string;
}

export default function MembersList({
  currentMembers,
  onDelete,
  titleText,
}: any) {
  const classes = useStyles();

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Typography
        variant="subtitle2"
        style={{ fontSize: 12, fontWeight: "bold", color: "textSecondary" }}
      >
        {" "}
        {titleText}
      </Typography>
      <List style={{}} dense={true} disablePadding={true}>
        {currentMembers.map((member: nameAndId, index: number) => (
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
                alt={member.memberName}
                src={member.profilePicture}
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
                onClick={() => onDelete(member)}
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
