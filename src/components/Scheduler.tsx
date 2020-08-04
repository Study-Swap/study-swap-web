import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useWindowDimensions from "../hooks/useWindowDimensions";

import { times, emptyArray, days } from "../constants/schedulerConstants";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    marginTop: 30,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  content: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  row: {
    width: "95%",
    height: 30,
    paddingVertical: 4,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  column: {
    marginRight: 3,
    marginLeft: 3,
    height: "95%",
    backgroundColor: "#D1D1D1",
    "&:hover": {
      backgroundColor: "#D9D9D9 !important",
    },
    borderRadius: 3,
  },
  columnClicked: {
    marginRight: 3,
    marginLeft: 3,
    height: "95%",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: "#4C549F !important",
    },
    borderRadius: 3,
  },
  columnBlank: {
    marginRight: 3,
    marginLeft: 3,
    height: "95%",
    borderRadius: 3,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  timeColumn: {
    marginRight: 3,
    marginLeft: 3,
    height: "95%",
    borderRadius: 3,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
}));

export default function Scheduler() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [timeSlots, setTimeSlots] = useState<any[][]>(emptyArray);
  const { innerWidth, innerHeight } = useWindowDimensions();

  const onTimeClick = (row: number, column: number): void => {
    setTimeSlots([
      ...timeSlots.slice(0, row), // return same before row to change
      [
        ...timeSlots[row].slice(0, column), // return same before col to change
        !timeSlots[row][column], // set item to opposite
        ...timeSlots[row].slice(column + 1), // return same after col to change
      ],
      ...timeSlots.slice(row + 1), // return same after row to change
    ]);
  };

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Availability</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Card raised={false} className={classes.content}>
            <CardContent>
              <div className={classes.row}>
                <div
                  className={classes.columnBlank}
                  style={{ width: innerWidth * 0.065 }}
                />{" "}
                {/* Blank */}
                {days.map((day) => {
                  // In the first row map out days
                  return (
                    <div
                      className={classes.columnBlank}
                      style={{ width: innerWidth * 0.065 }}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
              {times.map((time, timeIndex) => {
                // subsequent rows map time, then rectangles
                return (
                  <div className={classes.row} key={timeIndex}>
                    <div
                      className={classes.timeColumn}
                      style={{ width: innerWidth * 0.065 }}
                    >
                      {time}
                    </div>
                    {days.map((_day, dayIndex) => {
                      return (
                        <div
                          key={dayIndex}
                          className={
                            timeSlots[timeIndex][dayIndex]
                              ? classes.columnClicked
                              : classes.column
                          }
                          style={{ width: innerWidth * 0.065 }}
                          onClick={() => {
                            onTimeClick(timeIndex, dayIndex);
                          }}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
