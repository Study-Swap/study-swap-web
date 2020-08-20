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

const options = [
  "Chintan Modi",
  "Ashish Mahuli",
  "Akul Vijayvargiya",
  "Varun Madan",
];
let currentMembers = ["Rahul Khatti", "John B", "Sarah Wilkins"];

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

export default function EditChat(props: any) {
  const [newSelection, setSelection] = useState<string | null>("");
  const classes = useStyles();
  const [chatName, setChatName] = React.useState(props.chatName);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

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
            <SearchBox options={options} dropDownHeight="90px" />
          </Grid>

          <Divider />

          <Grid item xs={12} style={{ minHeight: "160px" }}>
            <MembersList currentMembers={currentMembers} />
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
