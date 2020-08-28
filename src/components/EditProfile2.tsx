import React, { Dispatch, SetStateAction, ChangeEvent } from "react";

import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import { getImageBase64String } from "../utils/imageUtils";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(5),
    overflow: "auto",
  },
  media: {
    height: 150,
    width: 150,
  },
  input: {
    width: "80%",
    padding: theme.spacing(2, 0),
  },
}));

interface EditProfileProps {
  setImageAsString: Dispatch<SetStateAction<string>>;
  setImageAsFile: Dispatch<SetStateAction<File>>;
  imageAsString: string;
  fullName: string;
  setFullName: Dispatch<SetStateAction<string>>;
  grade: string;
  setGrade: Dispatch<SetStateAction<string>>;
  bio: string;
  setBio: Dispatch<SetStateAction<string>>;
  classesNames: string;
  setClassesNames: Dispatch<SetStateAction<string>>;
  onSave: Function;
  innerWidth: number;
  innerHeight: number;
  setImageChanged: Dispatch<SetStateAction<boolean>>;
}

export default function EditProfile({
  setImageAsString,
  setImageAsFile,
  imageAsString,
  fullName,
  setFullName,
  grade,
  setGrade,
  bio,
  setBio,
  classesNames,
  setClassesNames,
  onSave,
  innerWidth,
  innerHeight,
  setImageChanged,
}: EditProfileProps) {
  // eslint-disable-next-line
  const classes = useStyles();

  return (
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
        <input
          style={{ display: "none" }}
          id="change-image"
          type="file"
          onChange={(e: any) => {
            e.preventDefault();
            setImageChanged(true);
            const image: File = e.target.files[0];
            getImageBase64String(image, setImageAsString);
            setImageAsFile(image);
          }}
        />
        <label htmlFor="change-image">
          <Avatar
            className={classes.media}
            alt={fullName}
            src={imageAsString}
          />
        </label>

        <div className={classes.input}>
          <TextField
            variant="outlined"
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={fullName}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setFullName(event.target.value as string);
            }}
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
              onChange={(event: ChangeEvent<{ value: unknown }>) => {
                setGrade(event.target.value as string);
              }}
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
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setBio(event.target.value as string);
            }}
          />
        </div>
        <div className={classes.input}>
          <TextField
            variant="outlined"
            fullWidth
            id="classes"
            label="Classes Separated by Commas"
            name="classes"
            value={classesNames}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setClassesNames(event.target.value as string);
            }}
          />
        </div>
        <Button variant="contained" color="primary" onClick={() => onSave()}>
          Save
        </Button>
      </div>
    </Paper>
  );
}
