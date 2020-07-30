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

const options = [
  "Chintan Modi",
  "Ashish Mahuli",
  "Akul Vijayvargiya",
  "Varun Madan",
];
let currentMembers = ["Rahul Khatti", "John B", "Sarah Wilkins"];

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
  const [newSelection, setSelection] = useState<string | null>("");
  const classes = useStyles();
  const [chatName, setChatName] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);

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
              <SearchBox options={options} dropDownHeight="150px" />
            </Grid>

            <Divider orientation="vertical" flexItem />

            <Grid item xs={3} className={classes.middleSection}>
              <MembersList currentMembers={currentMembers} />
            </Grid>
          </Grid>

          <Divider />

          <Grid container item justify="flex-end" spacing={1}>
            <Grid item>
              <Button size="small" variant="contained">
                Cancel
              </Button>
            </Grid>

            <Grid item>
              <Button size="small" variant="contained" color="secondary">
                Create
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
