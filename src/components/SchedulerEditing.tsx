import React, { useState, useEffect } from "react";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

interface SchedulerEditingProps {
  editing: boolean;
  setEditing: Function;
}

export default function SchedulerEditing({
  editing,
  setEditing,
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
