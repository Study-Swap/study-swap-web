// eslint-disable-next-line
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../constants/UserContext";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import ViewProfile from "../components/ViewProfile2";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import { makeStyles } from "@material-ui/core/styles";
import { userModel } from "../constants/Models";
import { dummyUser } from "../DummyData/profile";
import Scheduler from "../components/Scheduler";

// eslint-disable-next-line
import history from "../utils/historyUtils";
import { logoutUser, editUser } from "../utils/firebaseUtils";
import useWindowDimensions from "../hooks/useWindowDimensions";

const useStyles = makeStyles((theme) => ({
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
    height: 150,
    width: 150,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(5),
    overflow: "auto",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "80%",
    padding: theme.spacing(2, 0),
  },
}));

export default function Profile() {
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);
  const classes = useStyles();

  const [myUser, setMyUser] = useState<userModel>(dummyUser);
  const [editing, setEditing] = useState(false);
  const { innerWidth, innerHeight } = useWindowDimensions();

  const [fullName, setFullName] = useState<string>(
    user.firstName + " " + user.lastName
  );
  const [bio, setBio] = useState<string>(user.bio);
  const [grade, setGrade] = useState<string>(user.grade);

  useEffect(() => {
    //if (user.id === "") {
    //  history.push("/not-logged-in");
    //}
  }, []);

  function handleSave(updatedUser: userModel) {
    setMyUser(updatedUser);
    setEditing(!editing);
  }

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGrade(event.target.value as string);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(event.target.value);
  };

  const handleBioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBio(event.target.value);
  };

  const onSave = () => {
    const nameVals = fullName.split(" ");
    setUser({
      ...user,
      bio,
      firstName: nameVals[0],
      lastName: nameVals[1],
      grade,
    });
    editUser({ ...user, signedUp: true });
    setEditing(false);
  };

  return (
    <Container component="main" maxWidth="md">
      <ViewProfile
        firstName={user.firstName}
        lastName={user.lastName}
        grade={user.grade}
        bio={user.bio}
        editingClick={() => {
          setFullName(user.firstName + " " + user.lastName);
          setEditing(!editing);
        }}
        classIds={user.classes}
        classNames={user.classNames}
        setUser={setUser}
      />
      <Scheduler timeStrings={user.schedule} />

      <Modal
        open={editing}
        onClose={() => setEditing(false)}
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
        className={classes.modal}
      >
        <Paper
          className={classes.paper}
          style={{ width: innerWidth * 0.8, height: innerHeight * 0.75 }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              className={classes.media}
              alt="Prof Pic"
              src={require("../components/apoorv.png")}
            />
            <div className={classes.input}>
              <TextField
                variant="outlined"
                fullWidth
                id="name"
                label="Name"
                name="name"
                value={fullName}
                onChange={handleNameChange}
              />
            </div>
            <div className={classes.input}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-mutiple-name-label">Grade</InputLabel>
                <Select
                  labelId="grade-select-label"
                  id="demo-simple-select"
                  inputProps={{
                    id: "demo-mutiple-name-label",
                  }}
                  label="Grade"
                  value={grade}
                  onChange={handleSelectChange}
                >
                  <MenuItem value={"Freshman"}>Freshman</MenuItem>
                  <MenuItem value={"Sophomore"}>Sophomore</MenuItem>
                  <MenuItem value={"Junior"}>Junior</MenuItem>
                  <MenuItem value={"Senior"}>Senior</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={classes.input}>
              <TextField
                variant="outlined"
                fullWidth
                id="bio"
                label="Biography"
                name="bio"
                value={bio}
                onChange={handleBioChange}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onSave()}
            >
              Save
            </Button>
          </div>
        </Paper>
      </Modal>
    </Container>
  );
}
