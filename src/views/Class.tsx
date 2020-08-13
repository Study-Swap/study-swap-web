import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import FeedItem from "../components/FeedItem";
import { postData } from "../DummyData/home";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

import useWindowDimensions from "../hooks/useWindowDimensions";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  image: {
    marginLeft: 15,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#D1D1D1",
    "&:hover": {
      boxShadow: "3px 3px 3px #9E9E9E",
    },
  },
  checkButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    borderStyle: "solid",
    borderWidth: 2,
    padding: 3,
    borderRadius: 4,
    marginBottom: 4,
    borderColor: "grey",
    "&:hover": {
      boxShadow: "3px 3px 3px #9E9E9E",
    },
  },
});

const initArray = (size: number, value: any): Array<any> => {
  var array: Array<any> = new Array(size);
  for (var i = 0; i < size; i++) {
    array[i] = value;
  }
  return array;
};

export default function Class() {
  const classes = useStyles();
  const [postState, setPostState] = useState(postData);
  const [selection, setSelection] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const numStudents = initArray(100, 0);

  const { innerWidth, innerHeight } = useWindowDimensions();

  return (
    <Container component="main" maxWidth="md">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={6}
        className={classes.root}
      >
        <Card>
          <Grid item xs={12}>
            <Paper style={{ width: 870, height: 200, padding: 20 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  {/* Left Side */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-end",
                      marginBottom: 10,
                    }}
                  >
                    <Avatar
                      style={{ height: 90, width: 90 }}
                      alt="Engineering"
                      src={require("../DummyData/Engineering.jpg")}
                    />
                    <div style={{ marginLeft: 10 }}>
                      <Typography variant="h3">Engineering 100</Typography>
                      <Typography style={{ color: "grey" }}>
                        Section: 200 - Mondays, Wednesdays 2-3:30 PM
                      </Typography>
                    </div>
                  </div>
                  <Typography>
                    <strong>Professor:</strong> Professor Name{" "}
                    <span style={{ marginLeft: 20 }} />
                    <strong>GSI:</strong> GSI Name
                  </Typography>
                  <Typography>
                    <strong>Instructional Aids:</strong> Name 1, Name 2, Name 3,
                    Name 4, Name 5,
                  </Typography>
                  <Typography>Name 6, etc.</Typography>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      alignItems: "flex-end",
                    }}
                  >
                    <IconButton aria-label="more-options">
                      <MoreVertIcon fontSize="default" />
                    </IconButton>
                    <div className={classes.checkButton}>
                      <CheckRoundedIcon
                        fontSize="default"
                        style={{ marginBottom: 4 }}
                        color="action"
                      />
                      <Typography style={{ fontSize: 20 }}>Enrolled</Typography>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <Typography>{selection}</Typography>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row-reverse",
                        marginBottom: 10,
                      }}
                    >
                      <div
                        className={classes.image}
                        onMouseEnter={() => setSelection("Go To Class Website")}
                        onMouseLeave={() => setSelection("")}
                      >
                        <img
                          src={require("../constants/Class_Logos/Website.png")}
                          alt="Website Logo"
                          style={{ height: 60, padding: 3, width: 75 }}
                        />
                      </div>
                      <div
                        className={classes.image}
                        onMouseEnter={() => setSelection("Email Instructor")}
                        onMouseLeave={() => setSelection("")}
                      >
                        <img
                          src={require("../constants/Class_Logos/Gmail_logo.png")}
                          alt="Gmail Logo"
                          style={{ height: 60, padding: 3, width: 75 }}
                        />
                      </div>
                      <div
                        className={classes.image}
                        onMouseEnter={() => setSelection("Go To Canvas Page")}
                        onMouseLeave={() => setSelection("")}
                      >
                        <img
                          src={require("../constants/Class_Logos/Canvas_logo.png")}
                          alt="Canvas Logo"
                          style={{ height: 60, padding: 3, width: 75 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          </Grid>
        </Card>
        <br />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ width: 470, marginRight: 10 }}>
            {postState.map((thisPost, index) => (
              <>
                <FeedItem
                  postUserName={thisPost.postUserName}
                  postClassName={thisPost.postClassName}
                  postText={thisPost.postText}
                  timestamp={thisPost.timestamp}
                  edited={thisPost.edited}
                  userId={thisPost.userId}
                  classId={thisPost.classId}
                />
                <br />
              </>
            ))}
          </div>
          <div style={{ width: 380, marginLeft: 10 }}>
            <Paper
              style={{
                width: "100%",
                //minHeight: 600,
                //maxHeight: 900,
                height: open ? 900 : 600,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 5,
              }}
            >
              <Typography variant="h5">Class Roster</Typography>
              <Divider
                variant="fullWidth"
                style={{ marginTop: 10, width: "100%" }}
              />
              <div
                style={{
                  width: "100%",
                  //minHeight: 565,
                  //maxHeight: 865,
                  height: open ? 865 : 565,
                  overflow: open ? "auto" : "hidden",
                  paddingTop: 5,
                  paddingRight: 12,
                  paddingLeft: 12,
                }}
              >
                {numStudents.map((index) => {
                  return (
                    <Paper
                      key={index}
                      elevation={1}
                      style={{
                        width: "100%",
                        height: 60,
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: "#D9D9D9",
                        padding: 3,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        marginBottom: 5,
                      }}
                    >
                      <Avatar
                        style={{ height: 50, width: 50 }}
                        alt="Prof Pic"
                      />
                      <div style={{ marginLeft: 20 }}>
                        <Link style={{ color: "black", fontSize: 16 }}>
                          Student Name
                        </Link>
                        <Typography>Grade</Typography>
                      </div>
                    </Paper>
                  );
                })}
              </div>
              <Divider
                variant="fullWidth"
                style={{ marginTop: 10, width: "100%" }}
              />
              {open ? (
                <ExpandLessIcon
                  fontSize="small"
                  onClick={() => {
                    setOpen(!open);
                  }}
                />
              ) : (
                <ExpandMoreIcon
                  fontSize="small"
                  onClick={() => {
                    setOpen(!open);
                  }}
                />
              )}
            </Paper>
          </div>
        </div>
      </Grid>
    </Container>
  );
}
