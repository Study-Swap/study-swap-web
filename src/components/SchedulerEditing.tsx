import React, { useContext } from "react";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { UserContext } from "../constants/UserContext";

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
  const { user, setUser } = useContext(UserContext);
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
            editUserSchedule(arrayToTimes(timeSlots), user.id); // HARDCODED ID - TODO CHANGE ID
            setUser({ ...user, schedule: arrayToTimes(timeSlots) });
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
