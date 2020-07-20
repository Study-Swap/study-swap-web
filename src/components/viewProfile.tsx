// eslint-disable-next-line
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../constants/UserContext";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import { userModel } from "../constants/Models";
import { dummyUser } from "../DummyData/profile";

// eslint-disable-next-line
import history from "../utils/historyUtils";
import { logoutUser } from "../utils/firebaseUtils";

const useStyles = makeStyles({
  root: {
    width: "80%",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  pos: {
    fontSize: 20,
    marginBottom: 12,
  },
  media: {
    height: "100%",
    width: "100%",
  },
  input: {
    //marginLeft: theme.spacing(2),
    flex: 1,
    overflow: "auto",
    fontSize: 14,
    width: "100%",
  },
});

export default function viewProfile(props: any) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Avatar
              className={classes.media}
              alt="Prof Pic"
              src={require("../components/apoorv.png")}
            />
          </Grid>

          <Grid item xs={5}>
            <div>
              <Typography className={classes.title} gutterBottom>
                {props.firstName} {props.lastName}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {props.grade}
              </Typography>
            </div>
          </Grid>
          <Grid item>
            <IconButton
              type="submit"
              aria-label="edit"
              onClick={props.editingClick}
            >
              <EditIcon />
            </IconButton>
          </Grid>
        </Grid>
        <br></br>
        <Typography variant="body2" component="p">
          {props.bio}
        </Typography>
      </CardContent>
    </Card>
  );
}
