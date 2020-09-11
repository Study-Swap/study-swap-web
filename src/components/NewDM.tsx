import React, { useState, useEffect, ChangeEvent, useContext } from "react";
import { useAuthEffect } from "../hooks/useAuthEffect";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { UserContext } from "../constants/UserContext";

import SearchBox from "./SearchBox";
import MembersList from "./MembersList";

import { addChats, getUsersForChatCreation } from "../utils/firebaseUtils";

import { nameAndId } from "../constants/types/rosterTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "370px",
    width: "280px",
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
    height: "200px",
  },
}));

interface NewChatProps {
  closeModal: Function;
}

export default function NewDM({ closeModal }: NewChatProps) {
  const { user, setUser } = useContext(UserContext);

  const classes = useStyles();
  const [currentMembers, setCurrentMembers] = useState<nameAndId[]>([]);
  const [currentOptions, setCurrentOptions] = useState<nameAndId[]>([]);

  useAuthEffect(() => {
    getUsersForChatCreation(user.id)
      .then((res: any) => {
        setCurrentOptions(res);
      })
      .catch((err: any) => {
        console.error(err);
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
              New Direct Message
            </Typography>
          </Grid>

          <Divider />

          <div className={classes.middleSection}>
            <SearchBox
              options={currentOptions}
              placeholder="Search for someone to DM"
              dropDownHeight="130px"
              onChange={(user: nameAndId) => {
                //const tempOptions = currentOptions.slice();
                let toRemove = 0;
                currentOptions.filter((member, index) => {
                  if (member.memberId == user.memberId) {
                    toRemove = index;
                  }
                });
                if (currentMembers.length > 0) {
                  setCurrentOptions([
                    ...currentOptions.slice(0, toRemove),
                    ...currentOptions.slice(toRemove + 1),
                    currentMembers[0],
                  ]);
                } else {
                  setCurrentOptions([
                    ...currentOptions.slice(0, toRemove),
                    ...currentOptions.slice(toRemove + 1),
                  ]);
                }

                setCurrentMembers([user]);
                //delete tempOptions[toRemove];
                //setCurrentOptions([...tempOptions]);
              }}
            />
          </div>

          {/*<Divider orientation="vertical" flexItem />*/}

          <Divider />

          <div style={{ height: "70px" }}>
            <MembersList
              titleText="SELECTED"
              currentMembers={currentMembers}
              onDelete={(toDelete: nameAndId) => {
                let toRemove = 0;
                currentMembers.filter((member, index) => {
                  if (member.memberId == toDelete.memberId) {
                    toRemove = index;
                  }
                });
                setCurrentMembers([]);
                setCurrentOptions([...currentOptions, toDelete]);
              }}
            />
          </div>

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
                disabled={currentMembers.length == 0}
                onClick={() => {
                  let memberNames: string[] = [];
                  let memberIds: string[] = [];
                  currentMembers.forEach((member, index) => {
                    memberIds[index] = member.memberId;
                    memberNames[index] = member.memberName;
                  });
                  memberNames.push(user.firstName + " " + user.lastName);
                  memberIds.push(user.id);
                  addChats({
                    chatName: memberNames[0] + "/" + memberNames[1],
                    members: memberIds,
                    memberNames: memberNames,
                    messages: [],
                    isGroup: false,
                  });
                  closeModal();
                }}
              >
                DM
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
