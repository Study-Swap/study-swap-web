// eslint-disable-next-line
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../constants/UserContext";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Select from "@material-ui/core/Select";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import CancelIcon from "@material-ui/icons/Cancel";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ComputerIcon from "@material-ui/icons/Computer";
import SaveIcon from "@material-ui/icons/Save";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { userModel } from "../constants/Models";
import { dummyUser } from "../DummyData/profile";
import firebase from "../constants/Firebase";

// eslint-disable-next-line
import history from "../utils/historyUtils";
import { logoutUser } from "../utils/firebaseUtils";
import { NONAME, AnyRecordWithTtl } from "dns";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  pos: {
    fontSize: 20,
    marginBottom: 10,
  },
  media: {
    height: "70%",
    width: "100%",
  },
  picInput: {
    display: "none",
  },
  inputBio: {
    height: 150,
    width: 150,
  },
  input: {
    //marginLeft: theme.spacing(2),
    flex: 1,
    overflow: "auto",
    fontSize: 14,
    width: "100%",
  },
  userInfo: {
    marginLeft: 20,
    dislpay: "flex",
    flexDirection: "column",
  },
  button: {
    height: 40,
    marginRight: 3,
  },
});

interface imageAsFileType {
  name: string;
  lastModified: any;
  lastModifiedDate: any;
  size: any;
  type: any;
  webkitRelativePath: any;
}

export default function EditProfile({
  bio,
  firstName,
  lastName,
  grade,
  setEditing,
  setUser,
  classIds,
  classNames,
}: any) {
  // eslint-disable-next-line
  const storage = firebase.storage();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [bioInput, setBioInput] = useState(bio);
  const [firstInput, setFirstInput] = useState(firstName);
  const [lastInput, setLastInput] = useState(lastName);
  const [gradeInput, setGradeInput] = useState(grade);
  const [imageAsFile, setImageAsFile] = useState<File>();
  const [imageAsUrl, setImageAsUrl] = useState("");
  const [base64String, setBase64String] = useState<string>("");

  /*

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGrade(event.target.value as string);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(event.target.value as string);
  };

  const handleBioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBio(event.target.value as string);
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
*/

  return (
    <div></div>
    /*
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
        <Button variant="contained" color="primary" onClick={() => onSave()}>
          Save
        </Button>
      </div>
    </Paper>
    */
  );
}
