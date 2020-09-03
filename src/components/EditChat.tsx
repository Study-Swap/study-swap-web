import React, { useState, useEffect, ChangeEvent, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { UserContext } from "../constants/UserContext";

import MembersList from "./MembersList";
import SearchBox from "./SearchBox";

import { getUsersForChatCreation } from "../utils/firebaseUtils/users";
import {
  getCurrentChatMembers,
  addMember,
  leaveChat,
} from "../utils/firebaseUtils/chats";
import { chatsModel } from "../constants/Models";

import { nameAndId } from "../constants/types/rosterTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "350px",
    width: "300px",
  },
  inputChatName: {
    flex: 1,
    fontSize: 14,
  },

  media: {
    height: "50px",
    width: "50px",
  },
}));

interface EditChatProps {
  currentChat: chatsModel;
  handleClose: Function;
}

export default function EditChat({ currentChat, handleClose }: EditChatProps) {
  const { user, setUser } = useContext(UserContext);

  const classes = useStyles();
  const [chatName, setChatName] = useState(currentChat.chatName);
  const [newSelection, setSelection] = useState<string | null>("");
  const [currentMembers, setCurrentMembers] = useState<nameAndId[]>([]);
  const [currentOptions, setCurrentOptions] = useState<nameAndId[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [toDelete, setToDelete] = useState<string[]>([]);
  const [toAdd, setToAdd] = useState<string[]>([]);

  useEffect(() => {
    getUsersForChatCreation(user.id)
      .then((options: any) => {
        //setCurrentOptions(res);

        getCurrentChatMembers(currentChat.id, user.id)
          .then((members: any) => {
            setCurrentMembers(members);

            options = options.filter((el: nameAndId) => !members.includes(el));
            //console.log(temp);

            setCurrentOptions(options);
          })
          .catch((err: any) => {
            console.log(err);
          });
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  return (
    <Card className={classes.root}>
      <CardContent style={{ overflow: "auto", maxHeight: "300px" }}>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Typography
              color="textPrimary"
              variant="h6"
              style={{ fontWeight: "bold", fontSize: 14 }}
            >
              Edit Group
            </Typography>
          </Grid>

          <Divider />

          <Grid item>
            <InputBase
              className={classes.inputChatName}
              placeholder="Name your group"
              inputProps={{ "aria-label": "post to feed" }}
              value={chatName}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setChatName(event.target.value);
              }}
            />
          </Grid>

          <Divider />

          <Grid item xs={12} style={{ minHeight: "160px" }}>
            <SearchBox
              options={currentOptions}
              dropDownHeight="90px"
              onChange={(user: nameAndId) => {
                setToAdd([...toAdd, user.memberId]);

                setCurrentMembers([...currentMembers, user]);
                let toRemove = 0;
                currentOptions.filter((member, index) => {
                  if (member.memberId == user.memberId) {
                    toRemove = index;
                  }
                });
                setCurrentOptions([
                  ...currentOptions.slice(0, toRemove),
                  ...currentOptions.slice(toRemove + 1),
                ]);
              }}
            />
          </Grid>

          <Divider />

          <Grid item xs={12} style={{ minHeight: "160px" }}>
            <MembersList
              currentMembers={currentMembers}
              onDelete={(user: nameAndId) => {
                setToDelete([...toDelete, user.memberId]);
                let toRemove = 0;
                currentMembers.filter((member, index) => {
                  if (member.memberId == user.memberId) {
                    toRemove = index;
                  }
                });
                setCurrentMembers([
                  ...currentMembers.slice(0, toRemove),
                  ...currentMembers.slice(toRemove + 1),
                ]);
                setCurrentOptions([...currentOptions, user]);
              }}
            />
          </Grid>

          <Divider />
        </Grid>
      </CardContent>

      <Divider />

      <Grid
        container
        item
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        style={{ height: "50px", width: "95%", marginLeft: "10px" }}
      >
        <Grid item>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={() => {
              handleClose();
              let currentId: string = "";
              if (currentChat.id != null) {
                currentId = currentChat.id;
              }
              leaveChat(user.id, currentId);
            }}
          >
            Leave
          </Button>
        </Grid>

        <Grid item>
          <Button
            size="small"
            variant="contained"
            onClick={() => handleClose()}
          >
            Cancel
          </Button>
        </Grid>

        <Grid item>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={() => {
              handleClose();

              let currentId: string = "";
              if (currentChat.id != null) {
                currentId = currentChat.id;
              }

              toAdd.forEach((userId: string) => {
                addMember(userId, currentId);
              });

              toDelete.forEach((userId: string) => {
                leaveChat(userId, currentId);
              });
            }}
          >
            Confirm
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
