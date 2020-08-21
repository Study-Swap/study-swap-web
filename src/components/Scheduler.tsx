import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useWindowDimensions from "../hooks/useWindowDimensions";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

import SchedulerEditing from "./SchedulerEditing";

import {
  times,
  days,
  initArray,
  timesToArray,
} from "../constants/schedulerConstants";

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
    userDrag: "none",
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
    userDrag: "none",
  },
}));

interface SchedulerProps {
  timeStrings: string[];
}

export default function Scheduler({ timeStrings }: SchedulerProps) {
  /*
    Scheduling Alogorithm:
    - Pivots around mouse down and mouse up listeners
    - Main data is stored in timeSlots array, tempMouseDown array,
    isAdd (boolean to tell if we are adding or removing time slots),
    and initial/current coordinates. 
      - tempMouseDown array is the array that we compare the current
        selection to when the mouse is down so that we have current
        state and state before the mouse went down
      - isAdd depends on the initial coordinate of the drag. If the 
      initial coordinate is filled then we assume that we are removing
      if it is empty we assume we are adding
    - When mouse is down and we hover over a rectangle the clickDrag 
    function fires calculating the selection we need to highlight and
    comparing it with our tempMouseDown array in order to make our 
    current timeSlots array
  */
  const classes = useStyles();
  const [expanded, setExpanded] = useState<string | false>(false);
  // If we should add boxes or remove boxes
  const [isAdd, setIsAdd] = useState<boolean>(false);
  // Time Slots
  const [timeSlots, setTimeSlots] = useState<any[][]>(
    timesToArray(timeStrings).map((row) => {
      return row.slice();
    })
  );
  // Temporary Time slots to compare to before mouse was pressed
  const [tempMouseDown, setTempMouseDown] = useState<any[][]>(
    timesToArray(timeStrings).map((row) => {
      return row.slice();
    })
  );
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  // coordinate arrays will always have length 2
  const [initIndex, setInitIndex] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number[]>([]);
  const [editing, setEditing] = useState<boolean>(false);

  const { innerWidth, innerHeight } = useWindowDimensions();

  useEffect(() => {
    // On initial load the timeSlot vars do not initialize correctly sometimes
    console.log("editing times");
    setTimeSlots(
      timesToArray(timeStrings).map((row) => {
        return row.slice();
      })
    );
    setTempMouseDown(
      timesToArray(timeStrings).map((row) => {
        return row.slice();
      })
    );
  }, [timeStrings]);

  const mouseDown = (ev: MouseEvent) => {
    setIsMouseDown(true);
  };

  const mouseUp = (ev: MouseEvent) => {
    setIsMouseDown(false);
    setIsAdd(false); // reset isAdd
    setInitIndex([]); // reset initial index
  };

  useEffect(() => {
    // Add/Remove listeners
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);
    window.addEventListener("dragstart", mouseUp);

    return () => {
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);
      window.removeEventListener("dragstart", mouseUp);
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
    // Set max and mins of each coordinate
    var minX = -1,
      maxX = -1,
      minY = -1,
      maxY = -1;
    if (initial[0] > current[0]) {
      minX = current[0];
      maxX = initial[0];
    } else {
      maxX = current[0];
      minX = initial[0];
    }
    if (initial[1] > current[1]) {
      minY = current[1];
      maxY = initial[1];
    } else {
      maxY = current[1];
      minY = initial[1];
    }

    // Make temp array -- remember to make DEEP COPY of mouse down array using map
    var temp = tempMouseDown.map((row) => {
      return row.slice();
    });

    // Change temp based on isAdd and what's selected
    for (var i = minX; i < maxX + 1; i++) {
      for (var j = minY; j < maxY + 1; j++) {
        temp[i][j] = isAdd;
      }
    }

    // Set time slots -- remember to make DEEP COPY of temp using map
    setTimeSlots(
      temp.map((row) => {
        return row.slice();
      })
    );
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
            <SchedulerEditing
              editing={editing}
              setEditing={setEditing}
              timeSlots={timeSlots}
            />

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
                      return editing ? (
                        <div
                          key={`${timeIndex}, ${dayIndex}`}
                          className={
                            timeSlots[timeIndex][dayIndex]
                              ? classes.columnClicked
                              : classes.column
                          }
                          style={{ width: innerWidth * 0.07 }}
                          onMouseDown={(event) => {
                            // Prevent default in order to stop drag/select
                            event.preventDefault();
                          }}
                          onMouseMove={(event) => {
                            event.preventDefault();
                            if (isMouseDown) {
                              if (initIndex.length === 0) {
                                // If mouse is down and init is empty that means
                                // we are beginning our drag
                                setInitIndex([timeIndex, dayIndex]);
                                setIsAdd(!timeSlots[timeIndex][dayIndex]);
                              }
                            }
                          }}
                          onMouseEnter={(event) => {
                            event.preventDefault();
                            if (isMouseDown) {
                              setCurrentIndex([timeIndex, dayIndex]);
                              if (
                                initIndex.length > 0 &&
                                currentIndex.length > 0
                              )
                                // If mouse is down and there are values for coordinates
                                // Continue/Start Drag
                                clickDrag(initIndex, [timeIndex, dayIndex]);
                            }
                          }}
                          onClick={() => {
                            onTimeClick(timeIndex, dayIndex);
                          }}
                          onMouseUp={(event) => {
                            // On mouse up of a rectangle we want to set the temp mouse down array
                            event.preventDefault();
                            setTempMouseDown(
                              timeSlots.map((row) => {
                                return row.slice();
                              })
                            );
                          }}
                        />
                      ) : (
                        <div
                          key={`${timeIndex}, ${dayIndex}`}
                          className={
                            timeSlots[timeIndex][dayIndex]
                              ? classes.columnClicked
                              : classes.column
                          }
                          style={{ width: innerWidth * 0.07 }}
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
