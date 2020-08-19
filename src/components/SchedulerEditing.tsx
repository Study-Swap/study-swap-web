import React, { useState, useEffect } from "react";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

import { arrayToTimes } from "../constants/schedulerConstants";
import { editUserSchedule } from "../utils/firebaseUtils";

interface SchedulerEditingProps {
  editing: boolean;
  setEditing: Function;
  timeSlots: boolean[][];
}

export default function SchedulerEditing({
  editing,
  setEditing,
  timeSlots,
}: SchedulerEditingProps) {
  return (
    <div
      style={{
        alignSelf: "flex-end",
        display: "flex",
        flexDirection: "row-reverse",
      }}
    >
      <IconButton
        onClick={() => {
          if (editing) {
            editUserSchedule(arrayToTimes(timeSlots), "123"); // HARDCODED ID - TODO CHANGE ID
          }
          setEditing(!editing);
        }}
      >
        {editing ? (
          <EditIcon color="primary" fontSize="small" />
        ) : (
          <EditOutlinedIcon color="primary" fontSize="small" />
        )}
      </IconButton>
      <Typography color="primary" style={{ marginTop: 10, marginRight: -3 }}>
        {editing ? "Editing..." : ""}
      </Typography>
    </div>
  );
}
