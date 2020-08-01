// eslint-disable-next-line
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../constants/UserContext";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import { userModel } from "../constants/Models";
import { dummyUser } from "../DummyData/profile";

// eslint-disable-next-line
import history from "../utils/historyUtils";
import { logoutUser } from "../utils/firebaseUtils";

const useStyles = makeStyles({
  root: {
    width: "80%",
  },

  media: {
    height: "100%",
    width: "100%",
  },
  inputBio: {
    //marginLeft: theme.spacing(2),
    flex: 1,
    overflow: "auto",
    fontSize: 14,
    width: "100%",
  },
  inputName: {
    //marginLeft: theme.spacing(2),
    flex: 1,
    overflow: "auto",
    fontSize: 30,
    fontWeight: "bold",
  },
  inputGrade: {
    //marginLeft: theme.spacing(2),
    flex: 1,
    overflow: "auto",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default function EditProfile({
  bio,
  firstName,
  lastName,
  grade,
  handleCancel,
  handleSave,
}: any) {
  // eslint-disable-next-line

  const classes = useStyles();

  const [bioInput, setBioInput] = useState(bio);
  const [firstInput, setFirstInput] = useState(firstName);
  const [lastInput, setLastInput] = useState(lastName);
  const [gradeInput, setGradeInput] = useState(grade);

  return (
    <Container component="main" maxWidth="md">
      <Card className={classes.root}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Avatar
                className={classes.media}
                alt="Prof Pic"
                src={require("../components/apoorv.png")}
              />
            </Grid>

            <Grid item xs={5}>
              <div>
                <OutlinedInput
                  margin="dense"
                  className={classes.inputName}
                  placeholder="First Name"
                  inputProps={{ "aria-label": "post to feed" }}
                  value={firstInput}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setFirstInput(event.target.value);
                  }}
                />
                <OutlinedInput
                  margin="dense"
                  className={classes.inputName}
                  placeholder="First Name"
                  inputProps={{ "aria-label": "post to feed" }}
                  value={lastInput}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setLastInput(event.target.value);
                  }}
                />
                <OutlinedInput
                  margin="dense"
                  className={classes.inputName}
                  placeholder="First Name"
                  inputProps={{ "aria-label": "post to feed" }}
                  value={gradeInput}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setGradeInput(event.target.value);
                  }}
                />
              </div>
            </Grid>
            <Grid item>
              <IconButton
                type="submit"
                aria-label="edit"
                onClick={handleCancel}
              >
                <CancelIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                type="submit"
                aria-label="edit"
                onClick={handleSave({
                  id: "12",
                  firstName: firstInput,
                  lastName: lastInput,
                  email: "cmodi@umich.edu",
                  grade: gradeInput,
                  bio: bioInput,
                  classes: ["EECS 281", "EECS 376"],
                  chats: ["Chat stuff"],
                  signedUp: true,
                })}
              >
                <SaveIcon />
              </IconButton>
            </Grid>
          </Grid>
          <br></br>

          <OutlinedInput
            margin="dense"
            className={classes.inputBio}
            placeholder="Type a Comment..."
            inputProps={{ "aria-label": "post to feed" }}
            multiline={true}
            rowsMax={7}
            value={bioInput}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setBioInput(event.target.value);
            }}
          />
        </CardContent>
      </Card>
    </Container>
  );
}
