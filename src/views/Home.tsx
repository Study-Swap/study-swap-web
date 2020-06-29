// eslint-disable-next-line
import React, { useEffect, useContext } from "react";
import { UserContext } from "../constants/UserContext";
import Container from "@material-ui/core/Container";

// eslint-disable-next-line
import history from "../utils/historyUtils";

export default function Home() {
  // eslint-disable-next-line
  const { user } = useContext(UserContext);

  return (
    <Container component="main" maxWidth="md">
      <div>Home!</div>
    </Container>
  );
}
