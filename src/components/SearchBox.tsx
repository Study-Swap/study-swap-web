import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import classes from "*.module.css";

const options = [
  "Chintan Modi",
  "Ashish Mahuli",
  "Akul Vijayvargiya",
  "Varun Madan",
];
let currentMembers = ["Rahul Khatti", "John B", "Sarah Wilkins"];

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
  },

  media: {
    height: "30px",
    width: "30px",
  },
}));

export default function SearchBox(props: any) {
  const classes = useStyles();
  return (
    <Autocomplete
      className={classes.root}
      options={props.options}
      getOptionLabel={(option: string) => option}
      style={{ width: "100%" }}
      ListboxProps={{
        style: {
          maxHeight: "150px",
          overflow: "true",
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for people to add"
          margin="dense"
        />
      )}
      renderOption={(option) => (
        <Grid container spacing={1}>
          <Grid item>
            <Avatar
              className={classes.media}
              alt="Prof Pic"
              src={require("./apoorv.png")}
            />
          </Grid>

          <Grid item>
            <Typography
              color="textPrimary"
              variant="subtitle2"
              style={{ fontWeight: "bold" }}
            >
              {option}
            </Typography>
          </Grid>
        </Grid>
      )}
    />
  );
}
