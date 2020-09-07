import React, { useState, useEffect, ChangeEvent } from "react";
import { useAuthEffect } from "../hooks/useAuthEffect";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";

import SearchBox from "./SearchBox";
import MembersList from "./MembersList";

import { addChats, getUsersForChatCreation } from "../utils/firebaseUtils";

import { nameAndId } from "../constants/types/rosterTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "360px",
    width: "500px",
  },
  inputChatName: {
    flex: 1,
    fontSize: 14,
  },

  media: {
    height: "50px",
    width: "50px",
  },

  middleSection: {
    height: "210px",
  },
}));

interface NewChatProps {
  closeModal: Function;
}

export default function NewChat({ closeModal }: NewChatProps) {
  const classes = useStyles();
  const [chatName, setChatName] = useState("");
  const [currentMembers, setCurrentMembers] = useState<nameAndId[]>([]);
  const [currentOptions, setCurrentOptions] = useState<nameAndId[]>([]);

  useAuthEffect(() => {
    getUsersForChatCreation()
      .then((res: any) => {
        setCurrentOptions(res);
        console.log("new chat");
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Typography
              color="textPrimary"
              variant="h6"
              style={{ fontWeight: "bold", fontSize: 14 }}
            >
              Create Group
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

          <Grid container item spacing={2}>
            <Grid item xs={8} className={classes.middleSection}>
              <SearchBox
                options={currentOptions}
                dropDownHeight="150px"
                onChange={(user: nameAndId) => {
                  setCurrentMembers([...currentMembers, user]);
                  //const tempOptions = currentOptions.slice();
                  let toRemove = 0;
                  currentOptions.filter((member, index) => {
                    if (member.memberId == user.memberId) {
                      toRemove = index;
                    }
                  });
                  //console.log(toRemove);
                  setCurrentOptions([
                    ...currentOptions.slice(0, toRemove),
                    ...currentOptions.slice(toRemove + 1),
                  ]);
                  //delete tempOptions[toRemove];
                  //setCurrentOptions([...tempOptions]);
                }}
              />
            </Grid>

            {/*<Divider orientation="vertical" flexItem />*/}

            <Grid item xs={4} className={classes.middleSection}>
              <MembersList
                currentMembers={currentMembers}
                onDelete={(toDelete: nameAndId) => {
                  let toRemove = 0;
                  currentMembers.filter((member, index) => {
                    if (member.memberId == toDelete.memberId) {
                      toRemove = index;
                    }
                  });
                  setCurrentMembers([
                    ...currentMembers.slice(0, toRemove),
                    ...currentMembers.slice(toRemove + 1),
                  ]);
                  setCurrentOptions([...currentOptions, toDelete]);
                }}
              />
            </Grid>
          </Grid>

          <Divider />

          <Grid container item justifyContent="flex-end" spacing={1}>
            <Grid item>
              <Button
                size="small"
                variant="contained"
                onClick={() => closeModal()}
              >
                Cancel
              </Button>
            </Grid>

            <Grid item>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                disabled={chatName == "" || currentMembers.length == 0}
                onClick={() => {
                  let memberNames: string[] = [];
                  let memberIds: string[] = [];
                  currentMembers.forEach((member, index) => {
                    memberIds[index] = member.memberId;
                    memberNames[index] = member.memberName;
                  });
                  addChats({
                    chatName: chatName,
                    members: memberIds,
                    memberNames: memberNames,
                    messages: [],
                  });
                }}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
