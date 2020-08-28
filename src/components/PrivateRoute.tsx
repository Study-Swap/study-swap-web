import React from "react";
import { Route, Redirect } from "react-router-dom";

interface PrivateRouteProps {
  path: string;
  component: any;
  key: string;
  userId: string;
}

export default function PrivateRoute({
  path,
  component,
  key,
  userId,
}: PrivateRouteProps) {
  return userId ? (
    <Route path={path} component={component} key={key} />
  ) : (
    <Route render={() => <Redirect to="/not-logged-in" />} />
  );
}
