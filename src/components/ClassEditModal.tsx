import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import useWindowDimensions from "../hooks/useWindowDimensions";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(5),
    overflow: "auto",
  },
  input: {
    width: "80%",
    padding: theme.spacing(2, 0),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

interface ClassEditModalProps {
  editing: boolean;
  setEditing: Function;
  classTitle: string;
  setClassTitle: Function;
  classTime: string;
  setClassTime: Function;
  classSection: string;
  setClassSection: Function;
  profName: string;
  setProfName: Function;
  gsiName: string;
  setGSIName: Function;
  iaNames: string;
  setIANames: Function;
}

export default function ClassEditModal({
  editing,
  setEditing,
  classTitle,
  setClassTitle,
  classTime,
  setClassTime,
  classSection,
  setClassSection,
  profName,
  setProfName,
  gsiName,
  setGSIName,
  iaNames,
  setIANames,
}: ClassEditModalProps) {
  const classes = useStyles();

  const { innerWidth, innerHeight } = useWindowDimensions();

  return (
    <Modal
      open={editing}
      onClose={() => setEditing(false)}
      aria-labelledby="edit-modal-title"
      aria-describedby="edit-modal-description"
      className={classes.modal}
    >
      <Paper
        className={classes.paper}
        style={{ width: innerWidth * 0.8, height: innerHeight * 0.75 }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            style={{ height: 90, width: 90 }}
            alt="Engineering"
            src={require("../DummyData/Engineering.jpg")}
          />
          <div className={classes.input}>
            <TextField
              variant="outlined"
              fullWidth
              id="class name"
              label="Class Name"
              name="name"
              value={classTitle}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setClassTitle(event.target.value);
              }}
            />
          </div>
          <div className={classes.input}>
            <TextField
              variant="outlined"
              fullWidth
              id="class time"
              label="Class Time"
              name="name"
              value={classTime}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setClassTime(event.target.value);
              }}
            />
          </div>
          <div className={classes.input}>
            <TextField
              variant="outlined"
              fullWidth
              id="class section"
              label="Section"
              name="name"
              value={classSection}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setClassSection(event.target.value);
              }}
            />
          </div>
          <div className={classes.input}>
            <TextField
              variant="outlined"
              fullWidth
              id="professor name"
              label="Professor Name"
              name="name"
              value={profName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setProfName(event.target.value);
              }}
            />
          </div>
          <div className={classes.input}>
            <TextField
              variant="outlined"
              fullWidth
              id="gsi name"
              label="GSI Name"
              name="name"
              value={gsiName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setGSIName(event.target.value);
              }}
            />
          </div>
          <div className={classes.input}>
            <TextField
              variant="outlined"
              fullWidth
              id="is names"
              label="IA Names"
              name="name"
              value={iaNames}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setIANames(event.target.value);
              }}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setEditing(false);
            }}
          >
            Save
          </Button>
        </div>
      </Paper>
    </Modal>
  );
}
