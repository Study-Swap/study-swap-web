import React, { useEffect, useContext } from "react";
import { UserContext } from "../constants/UserContext";
import Container from "@material-ui/core/Container";

import history from "../utils/historyUtils";
import { isUserSignedIn } from "../utils/firebaseUtils";

export default function Home() {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (isUserSignedIn()) history.push("/not-logged-in");
  }, [user]);

  return (
    <Container component="main" maxWidth="md">
      <div>Home!</div>
    </Container>
  );
}
