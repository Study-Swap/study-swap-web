import React, { useContext } from "react";
import { useLocation } from "react-router-dom";

import Container from "@material-ui/core/Container";

import OtherProfile from "../components/OtherProfile";
import PersonalProfile from "../components/PersonalProfile";
import { UserContext } from "../constants/UserContext";

interface LocationProps {
  userId: string;
}

export default function Profile() {
  const location = useLocation<LocationProps>();
  const { user } = useContext(UserContext);

  return (
    <Container component="main" maxWidth="md">
      {location.state?.userId && location.state.userId !== user.id ? (
        <OtherProfile userId={location.state.userId} />
      ) : (
        <PersonalProfile />
      )}
    </Container>
  );
}
