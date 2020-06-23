import React, { useEffect, useContext } from "react";
import { UserContext } from "../constants/UserContext";
import Container from "@material-ui/core/Container";
import history from "../utils/historyUtils";

export default function Chats() {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user.id === "") {
      history.push("/not-logged-in");
    }
  }, [user]);

  return (
    <Container component="main" maxWidth="md">
      <div>Chats!</div>
    </Container>
  );
}
