// eslint-disable-next-line
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../constants/UserContext";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import EditProfile from "../components/EditProfile";
import ViewProfile from "../components/ViewProfile";

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

  const [myUser, setMyUser] = useState<userModel>(dummyUser);
  const [editing, setEditing] = useState(false);

  return (
    <Container component="main" maxWidth="md">
      <ViewProfile
        firstName={myUser.firstName}
        lastName={myUser.lastName}
        grade={myUser.grade}
        bio={myUser.bio}
        editingClick={() => setEditing(!editing)}
      />

      <EditProfile
        firstName={myUser.firstName}
        lastName={myUser.lastName}
        grade={myUser.grade}
        bio={myUser.bio}
        handleCancel={() => setEditing(!editing)}
        handleSave={(user: userModel) => setMyUser(user)}
      />

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
