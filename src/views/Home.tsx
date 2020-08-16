import React, { useState, useEffect } from "react";
// eslint-disable-next-line
import { UserContext } from "../constants/UserContext";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Feed from "../components/Feed";

// eslint-disable-next-line
import history from "../utils/historyUtils";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    //flex: 1,
  },

  filterBox: {
    //flex:1,
    //position: "-webkit-sticky", /* Safari */
    position: "fixed",
    right: "100px",
    top: "200px",

    height: "300px",
    width: "200px",
  },

  formControl: {
    //padding: 2,
  },

  formLabel: {
    backgroundColor: "#E5E5E5",
    borderRadius: "25px",
    paddingLeft: "0px",
    paddingRight: "10px",
    paddingBottom: "0px",
    paddingTop: "0px",
    fontSize: 14,
    marginTop: "12px",
  },

  formCheckBox: {},
});

export default function Home() {
  const classes = useStyles();
  // eslint-disable-next-line
  const [state, setState] = React.useState({
    announcement: true,
    hw: true,
    project: true,
    exam: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { announcement, hw, project, exam } = state;

  return (
    <Container component="main" maxWidth="md" className={classes.root}>
        <Feed />

        <Card className={classes.filterBox}>
          <CardContent>

            <Grid container justifyContent="center" alignContent="center">
              <Grid item>

      <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Choose Categories</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CircleCheckedFilled />}
                    icon={<CircleUnchecked />}
                    checked={announcement}
                    onChange={handleChange}
                    name="announcement"
                  />
                }
                label="Announcement"
                className={classes.formLabel}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CircleCheckedFilled />}
                    icon={<CircleUnchecked />}
                    checked={hw}
                    onChange={handleChange}
                    name="hw"
                  />
                }
                label="HW"
                className={classes.formLabel}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CircleCheckedFilled />}
                    icon={<CircleUnchecked />}
                    checked={project}
                    onChange={handleChange}
                    name="project"
                  />
                }
                label="Exam"
                className={classes.formLabel}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CircleCheckedFilled />}
                    icon={<CircleUnchecked />}
                    checked={exam}
                    onChange={handleChange}
                    name="exam"
                  />
                }
                label="Project"
                className={classes.formLabel}
              />
            </FormGroup>
          </FormControl>
          </Grid>
          </Grid>

          </CardContent>
         
         </Card>
    </Container>
  );
}
