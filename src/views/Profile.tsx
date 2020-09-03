import React from "react";
import { useLocation } from "react-router-dom";

import Container from "@material-ui/core/Container";

import OtherProfile from "../components/OtherProfile";
import PersonalProfile from "../components/PersonalProfile";

interface LocationProps {
  userId: string;
}

export default function Profile() {
  const location = useLocation<LocationProps>();

  return (
    <Container component="main" maxWidth="md">
      {location.state.userId ? (
        <OtherProfile userId={location.state.userId} />
      ) : (
        <PersonalProfile />
      )}
    </Container>
  );
}
