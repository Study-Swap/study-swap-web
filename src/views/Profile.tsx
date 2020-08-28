// eslint-disable-next-line
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../constants/UserContext";
import Container from "@material-ui/core/Container";
import Modal from "@material-ui/core/Modal";

import { makeStyles } from "@material-ui/core/styles";
import ViewProfile from "../components/ViewProfile2";
import EditProfile from "../components/EditProfile2";
import Scheduler from "../components/Scheduler";

// eslint-disable-next-line
import history from "../utils/historyUtils";
import { editUser } from "../utils/firebaseUtils";
import {
  uploadAndString,
  folderEnums,
  makeProfilePicName,
} from "../utils/imageUtils";
import useWindowDimensions from "../hooks/useWindowDimensions";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function Profile() {
  // Context
  const { user, setUser } = useContext(UserContext);

  const classes = useStyles();

  // Edit Info
  const [editing, setEditing] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [grade, setGrade] = useState<string>("");
  const [classesNames, setClassesNames] = useState<string>("");
  const [imageAsFile, setImageAsFile] = useState<File>(
    new File([""], "filename")
  ); // Blank file object
  const [imageAsString, setImageAsString] = useState<string>("");
  const [imageChanged, setImageChanged] = useState<boolean>(false);

  const { innerWidth, innerHeight } = useWindowDimensions();

  useEffect(() => {
    //if (user.id === "") {
    //  history.push("/not-logged-in");
    //}
  }, []);

  // Edit Functions **********************************************************

  const onSave = () => {
    const nameVals = fullName.split(" ");
    const classNames = classesNames.split(",");
    if (imageChanged && imageAsFile) {
      uploadAndString(
        folderEnums.PROFILE_FOLDER,
        makeProfilePicName(user.firstName, user.lastName),
        imageAsFile
      ).then((firebaseString) => {
        setUser({
          ...user,
          bio,
          firstName: nameVals[0],
          lastName: nameVals[1],
          grade,
          classNames,
          profilePicture: firebaseString,
        });
        editUser({
          ...user,
          bio,
          firstName: nameVals[0],
          lastName: nameVals[1],
          grade,
          signedUp: true,
          classNames,
          profilePicture: firebaseString,
        });
        setImageAsString(firebaseString);
      });
    } else {
      setUser({
        ...user,
        bio,
        firstName: nameVals[0],
        lastName: nameVals[1],
        grade,
        classNames,
      });
      editUser({
        ...user,
        bio,
        firstName: nameVals[0],
        lastName: nameVals[1],
        grade,
        signedUp: true,
        classNames,
      });
    }
    setEditing(false);
  };

  // Edit Functions **********************************************************

  return (
    <Container component="main" maxWidth="md">
      <ViewProfile
        firstName={user.firstName}
        lastName={user.lastName}
        grade={user.grade}
        bio={user.bio}
        editingClick={() => {
          setFullName(user.firstName + " " + user.lastName);
          setBio(user.bio);
          setGrade(user.grade);
          setClassesNames(user.classNames.join(","));
          setImageAsString(user.profilePicture ? user.profilePicture : "");
          setImageChanged(false);
          setEditing(!editing);
        }}
        classIds={user.classes}
        classNames={user.classNames}
        setUser={setUser}
        profilePicture={user.profilePicture ? user.profilePicture : ""}
      />
      <Scheduler timeStrings={user.schedule} />

      <Modal
        open={editing}
        onClose={() => setEditing(false)}
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
        className={classes.modal}
      >
        <EditProfile
          setImageAsString={setImageAsString}
          setImageAsFile={setImageAsFile}
          imageAsString={imageAsString}
          fullName={fullName}
          setFullName={setFullName}
          grade={grade}
          setGrade={setGrade}
          bio={bio}
          setBio={setBio}
          classesNames={classesNames}
          setClassesNames={setClassesNames}
          onSave={onSave}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          setImageChanged={setImageChanged}
        />
      </Modal>
    </Container>
  );
}
