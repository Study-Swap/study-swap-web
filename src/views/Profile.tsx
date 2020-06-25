// eslint-disable-next-line
import React, { useEffect, useContext } from "react";
import { UserContext } from "../constants/UserContext";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

// eslint-disable-next-line
import history from "../utils/historyUtils";
import { logoutUser } from "../utils/firebaseUtils";

export default function Profile() {
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);

  return (
    <Container component="main" maxWidth="md">
      <div>Profile!</div>
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
