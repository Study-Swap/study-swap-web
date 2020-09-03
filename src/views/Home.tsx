import React, { useState, useContext, ChangeEvent } from "react";
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
import { Paper, Button } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    //flex: 1,
  },

  filterBox: {
    //flex:1,
    //position: "-webkit-sticky", /* Safari */
    position: "fixed",
    right: "100px",
    top: "150px",

    height: "380px",
    width: "250px",
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
  labelText: {
    //fontWeight: "bold",
    fontSize: 14,
  },

  formCheckBox: {},
});

export default function Home() {
  // Context
  const { user, setUser } = useContext(UserContext);

  const classes = useStyles();
  // eslint-disable-next-line
  const [filter, setFilter] = useState({
    Announcement: true,
    HW: true,
    Project: true,
    Exam: true,
    Social: true,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, [event.target.name]: event.target.checked });
  };

  const { Announcement, HW, Project, Exam, Social } = filter;

  return (
    <Container component="main" maxWidth="md" className={classes.root}>
      <Feed categoryFilter={filter} />

      <Card className={classes.filterBox}>
        <CardContent>
          <Grid
            container
            justifyContent="center"
            alignContent="center"
            spacing={3}
          >
            <Grid item>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">
                  Choose Categories to Show
                </FormLabel>
                <FormGroup style={{ fontSize: 10 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checkedIcon={<CircleCheckedFilled />}
                        icon={<CircleUnchecked />}
                        checked={Announcement}
                        onChange={handleChange}
                        name="Announcement"
                      />
                    }
                    label={
                      <Typography
                        className={classes.labelText}
                        variant="subtitle2"
                        color="textPrimary"
                      >
                        Announcement
                      </Typography>
                    }
                    className={classes.formLabel}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checkedIcon={<CircleCheckedFilled />}
                        icon={<CircleUnchecked />}
                        checked={HW}
                        onChange={handleChange}
                        name="HW"
                      />
                    }
                    label={
                      <Typography
                        className={classes.labelText}
                        variant="subtitle2"
                        color="textPrimary"
                      >
                        HW
                      </Typography>
                    }
                    className={classes.formLabel}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checkedIcon={<CircleCheckedFilled />}
                        icon={<CircleUnchecked />}
                        checked={Exam}
                        onChange={handleChange}
                        name="Exam"
                      />
                    }
                    label={
                      <Typography
                        className={classes.labelText}
                        variant="subtitle2"
                        color="textPrimary"
                      >
                        Exam
                      </Typography>
                    }
                    className={classes.formLabel}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checkedIcon={<CircleCheckedFilled />}
                        icon={<CircleUnchecked />}
                        checked={Project}
                        onChange={handleChange}
                        name="Project"
                      />
                    }
                    label={
                      <Typography
                        className={classes.labelText}
                        variant="subtitle2"
                        color="textPrimary"
                      >
                        Project
                      </Typography>
                    }
                    className={classes.formLabel}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checkedIcon={<CircleCheckedFilled />}
                        icon={<CircleUnchecked />}
                        checked={Social}
                        onChange={handleChange}
                        name="Social"
                      />
                    }
                    label={
                      <Typography
                        className={classes.labelText}
                        variant="subtitle2"
                        color="textPrimary"
                      >
                        Social
                      </Typography>
                    }
                    className={classes.formLabel}
                  />
                </FormGroup>
              </FormControl>
            </Grid>

            <Grid item>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ fontSize: 12, width: "48%" }}
                  onClick={() => {
                    //get this working programatically
                    //let temp = Object.create(filter);
                    //temp = Object.keys(temp).forEach(i=> temp[i] = true);

                    setFilter({
                      Announcement: true,
                      HW: true,
                      Project: true,
                      Exam: true,
                      Social: true,
                    });
                  }}
                >
                  Select All
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  style={{ fontSize: 12, width: "48%" }}
                  onClick={() => {
                    //get this working programatically, deep copy mad annoying
                    //let temp = Object.create(filter);
                    //temp = Object.keys(temp).forEach(i=> temp[i] = true);

                    setFilter({
                      Announcement: false,
                      HW: false,
                      Project: false,
                      Exam: false,
                      Social: false,
                    });
                  }}
                >
                  Unselect All
                </Button>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
