import React, { useState, useEffect } from "react";
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
    userSelect: "none",
  },
  timeColumn: {
    marginRight: 3,
    marginLeft: 3,
    height: "95%",
    borderRadius: 3,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    userSelect: "none",
  },
}));

export default function Scheduler() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [timeSlots, setTimeSlots] = useState<any[][]>(emptyArray);
  const [tempTimeSlots, setTempTimeSlots] = useState<any[][]>(emptyArray);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  // coordinate arrays will always have length 2
  const [currentIndex, setCurrentIndex] = useState<number[]>([0, 0]);
  const [initIndex, setInitIndex] = useState<number[]>([]);
  const { innerWidth, innerHeight } = useWindowDimensions();

  useEffect(() => {
    console.log(`Initial Index: ${initIndex[0]}, ${initIndex[1]}`);
    console.log(`Current Index: ${currentIndex[0]}, ${currentIndex[1]}`);
  }, [currentIndex]);

  const mouseDown = (ev: MouseEvent) => {
    setIsMouseDown(true);
  };

  const mouseUp = (ev: MouseEvent) => {
    setIsMouseDown(false);
    setTempTimeSlots(timeSlots); // set temp array as main array
    setInitIndex([]); // reset initial index
  };

  useEffect(() => {
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);

    return () => {
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);
    };
  }, []);

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

  const clickDrag = (initial: number[], current: number[]): void => {
    /* 
      Make temp array bc you cant directly change state, so to make the change more simple,
      make a copy, change values then set again 
    */
    if (initial === current) return;
    const temp = tempTimeSlots;
    if (initial[0] === current[0]) {
      // Case 1: Horizontal Line
      for (
        var i = initial[1] < current[1] ? initial[1] : current[1];
        i < Math.abs(initial[1] - current[1]) + 1;
        i++
      ) {
        temp[initial[0]][i] = !temp[initial[0]][i];
      }
      console.log("horiz");
    } else if (initial[1] === current[1]) {
      // Case 2: Vertical Line
      for (
        var i = initial[0] < current[0] ? initial[0] : current[0];
        i < Math.abs(initial[0] - current[0]) + 1;
        i++
      ) {
        temp[0][initial[1]] = !temp[0][initial[1]];
      }
      console.log("vert");
    } else {
      // Case 3: Gotta do real math :(
      var upperLeft = [
        // Find the upper left vertex
        Math.min(initial[0], current[0]),
        Math.min(initial[1], current[1]),
      ];
      var diffXY = [
        // Find differences in Xs and Ys
        Math.abs(initial[0] - current[0]) + 1,
        Math.abs(initial[1] - current[1]) + 1,
      ];

      for (var i = upperLeft[0]; i < diffXY[0]; i++) {
        for (var j = upperLeft[1]; j < diffXY[1]; j++) {
          temp[i][j] = !temp[i][j];
        }
      }
    }
    console.log(temp);
    setTimeSlots(temp);
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
                  style={{ width: innerWidth * 0.07 }}
                />{" "}
                {/* Blank */}
                {days.map((day) => {
                  // In the first row map out days
                  return (
                    <div
                      key={day}
                      className={classes.columnBlank}
                      style={{ width: innerWidth * 0.07 }}
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
                      style={{ width: innerWidth * 0.07 }}
                    >
                      {time}
                    </div>
                    {days.map((_day, dayIndex) => {
                      return (
                        <div
                          key={`${timeIndex}, ${dayIndex}`}
                          className={
                            timeSlots[timeIndex][dayIndex]
                              ? classes.columnClicked
                              : classes.column
                          }
                          style={{ width: innerWidth * 0.07 }}
                          onMouseMove={() => {
                            if (isMouseDown) {
                              setCurrentIndex([timeIndex, dayIndex]);
                              if (initIndex.length === 0) {
                                console.log("setting init");
                                setInitIndex([timeIndex, dayIndex]);
                                // Sometimes indices dont update in time
                                clickDrag(
                                  [timeIndex, dayIndex],
                                  [timeIndex, dayIndex]
                                );
                              }
                              // Sometimes current index doesnt update in time
                              clickDrag(initIndex, currentIndex);
                            }
                          }}
                          onClick={() => {
                            setInitIndex([timeIndex, dayIndex]);
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
