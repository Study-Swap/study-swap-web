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
import EditIcon from "@material-ui/icons/Edit";
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

  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  pos: {
    fontSize: 20,
    marginBottom: 12,
  },
  media: {
    height: "100%",
    width: "100%",
  },
  input: {
    //marginLeft: theme.spacing(2),
    flex: 1,
    overflow: "auto",
    fontSize: 14,
    width: "100%",
  },
});

export default function Profile() {
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);
  const classes = useStyles();

  const [myUser, setMyUser] = useState(dummyUser);
  const [editing, setEditing] = useState(false);

  const [bioInput, setBioInput] = useState(myUser.bio);

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
                <Typography className={classes.title} gutterBottom>
                  {myUser.firstName} {myUser.lastName}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {myUser.grade}
                </Typography>
              </div>
            </Grid>
            <Grid item>
              <IconButton
                type="submit"
                aria-label="edit"
                onClick={() => setEditing(!editing)}
              >
                {editing ? <SaveIcon /> : <EditIcon />}
              </IconButton>
            </Grid>
          </Grid>
          <br></br>

          {!editing ? (
            <Typography variant="body2" component="p">
              {myUser.bio}
            </Typography>
          ) : (
            <OutlinedInput
              margin="dense"
              className={classes.input}
              placeholder="Type a Comment..."
              inputProps={{ "aria-label": "post to feed" }}
              multiline={true}
              rowsMax={7}
              value={bioInput}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setBioInput(event.target.value);
              }}
            />
          )}
        </CardContent>
      </Card>

      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          logoutUser(setUser).then(() => {
            history.push("/login");
          })
        }
      >
        Logout
      </Button>
    </Container>
  );
}
