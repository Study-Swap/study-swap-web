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
import Popper from "@material-ui/core/Popper";

import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import MembersList from "./MembersList";
import SearchBox from "./SearchBox";
import { CardContent } from "@material-ui/core";

interface nameAndId {
  memberName: string;
  memberId: string;
}

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

const options: nameAndId[] = [
  { memberName: "Ashish Mahuli", memberId: "7k1MF9w490XOeFH5ygGY" },
  { memberName: "Chintan Modi", memberId: "6loalAzoo6UpCo00zFucLfexm8t1" },
];

export default function EditChat(props: any) {
  const [newSelection, setSelection] = useState<string | null>("");
  const classes = useStyles();
  const [chatName, setChatName] = React.useState(props.currentChat.chatName);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [currentMembers, setCurrentMembers] = useState<nameAndId[]>([]);
  const [currentOptions, setCurrentOptions] = useState<nameAndId[]>(options);

  interface nameAndId {
    memberName: string;
    memberId: string;
  }

  useEffect(() => {
    /*getUsersForChatCreation()
    .then((res: any) => {
      setCurrentOptions(res);
      console.log(res);
    })
    .catch((err: any) => {
      console.log(err);
    });*/
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
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
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

          <Divider />

          <Grid item xs={12} style={{ minHeight: "160px" }}>
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

          <Divider />
        </Grid>
      </CardContent>

      <Divider />

      <Grid
        container
        item
        justifyContent="flex-end"
        alignItems="center"
        spacing={1}
        style={{ height: "50px" }}
      >
        <Grid item>
          <Button size="small" variant="contained">
            Cancel
          </Button>
        </Grid>

        <Grid item>
          <Button size="small" variant="contained" color="secondary">
            Confirm
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
