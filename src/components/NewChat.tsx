import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import MembersList from "./MembersList";
import SearchBox from "./SearchBox";
import { CardContent } from "@material-ui/core";
import Popper from "@material-ui/core/Popper";
import { addChats } from "../utils/firebaseUtils";

interface nameAndId {
  memberName: string;
  memberId: string;
}

const options: nameAndId[] = [
  { memberName: "Ashish Mahuli", memberId: "7k1MF9w490XOeFH5ygGY" },
  { memberName: "Chintan Modi", memberId: "6loalAzoo6UpCo00zFucLfexm8t1" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    height: "400px",
    width: "500px",
  },
  inputChatName: {
    flex: 1,
    fontSize: 16,
  },

  media: {
    height: "50px",
    width: "50px",
  },

  middleSection: {
    height: "210px",
  },
}));

export default function NewChat(props: any) {
  //const [newSelection, setSelection] = useState<string | null>("");
  const classes = useStyles();
  const [chatName, setChatName] = React.useState("");
  const [currentMembers, setCurrentMembers] = useState<nameAndId[]>([]);
  //const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Typography
              color="textPrimary"
              variant="h6"
              style={{ fontWeight: "bold" }}
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
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setChatName(event.target.value);
              }}
            />
          </Grid>

          <Divider />

          <Grid container item spacing={2}>
            <Grid item xs={8} className={classes.middleSection}>
              <SearchBox
                options={options}
                dropDownHeight="150px"
                onChange={(user: nameAndId) =>
                  setCurrentMembers([...currentMembers, user])
                }
              />
            </Grid>

            <Divider orientation="vertical" flexItem />

            <Grid item xs={3} className={classes.middleSection}>
              <MembersList currentMembers={currentMembers} />
            </Grid>
          </Grid>

          <Divider />

          <Grid container item justifyContent="flex-end" spacing={1}>
            <Grid item>
              <Button size="small" variant="contained">
                Cancel
              </Button>
            </Grid>

            <Grid item>
              <Button
                size="small"
                variant="contained"
                color="secondary"
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
