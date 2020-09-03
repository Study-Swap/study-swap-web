import React, { useState, useEffect, useMemo } from "react";
import { Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import { theme } from "./constants/theme";
import { menuList, routes, privateRoutes } from "./views";
import { Copyright } from "./components/Copyright";
import AppLayout from "./components/AppLayout";
import { UserContext } from "./constants/UserContext";

import history from "./utils/historyUtils";
import firebase from "./constants/Firebase";
import { getUser, addUsagePoint } from "./utils/firebaseUtils";

function App() {
  const classes = useStyles();
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    classes: [""],
    chats: [""],
    schedule: [""],
    bio: "",
    grade: "",
    classNames: [""],
    profilePicture: "",
  });

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged((authUser) => {
      console.log("auth changed");
      console.log(authUser?.uid);
      if (authUser) {
        getUser(authUser.uid).then((res: any) => {
          setUser(res);
          console.log(res);
        });
        addUsagePoint(authUser.uid);
      }
    });

    return subscriber; // Unsubscribe on unmount
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Router history={history}>
          <AppLayout
            menuList={menuList}
            userProfilePic={user.profilePicture ? user.profilePicture : ""}
          />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              <UserContext.Provider value={value}>
                <Switch>
                  {routes.map((element: any) => (
                    <Route
                      path={element.path}
                      component={element.component}
                      key={element.path}
                      userId={user.id}
                    />
                  ))}
                  {privateRoutes.map((element: any) => (
                    <PrivateRoute
                      path={element.path}
                      component={element.component}
                      key={element.path}
                    />
                  ))}
                </Switch>
              </UserContext.Provider>
              <Box pt={4}>
                <Copyright />
              </Box>
            </Container>
          </main>
        </Router>
      </div>
    </ThemeProvider>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#DBE6F5",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default App;
