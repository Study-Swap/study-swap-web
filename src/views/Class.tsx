import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/core/styles";
import FeedItem from "../components/FeedItem";
import { postData } from "../DummyData/home";

import ClassRoster from "../components/ClassRoster";
import ClassTitle from "../components/ClassTitle";

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
  mainPaper: { width: 870, height: 200, padding: 20 },
  mainDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  rightSide: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  rightTop: {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "flex-end",
  },
  rightBottom: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  iconLinks: {
    display: "flex",
    flexDirection: "row-reverse",
    marginBottom: 10,
  },
});

export default function Class() {
  const classes = useStyles();
  const [postState, setPostState] = useState(postData);
  const [selection, setSelection] = useState<string>("");

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
            <Paper className={classes.mainPaper}>
              <div className={classes.mainDiv}>
                <ClassTitle />
                <div className={classes.rightSide}>
                  <div className={classes.rightTop}>
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
                  <div className={classes.rightBottom}>
                    <Typography>{selection}</Typography>
                    <div className={classes.iconLinks}>
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
            <ClassRoster />
          </div>
        </div>
      </Grid>
    </Container>
  );
}
