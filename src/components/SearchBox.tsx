import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import classes from "*.module.css";

interface nameAndId {
  memberName: string;
  memberId: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    fontSize: 14,
  },

  media: {
    height: "30px",
    width: "30px",
  },
}));

export default function SearchBox(props: any) {
  const classes = useStyles();
  const [value, setValue] = React.useState<nameAndId | null>(null);
  const [inputValue, setInputValue] = React.useState<string>("");

  const { options } = props;

  useEffect(() => {
    console.log(options);
  }, [options]);

  return (
    <Autocomplete
      value={value}
      inputValue={inputValue}
      onChange={(event: any, newValue: nameAndId | null) => {
        if (newValue != null) {
          console.log(newValue);
          props.onChange(newValue);
          setValue(null);
          setInputValue("");
        }
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      className={classes.root}
      options={props.options}
      getOptionLabel={(option: nameAndId) => option.memberName}
      fullWidth={true}
      ListboxProps={{
        style: {
          fontSize: 14,
          maxHeight: props.dropDownHeight,
          overflow: "true",
        },
      }}
      renderInput={(params) => (
        <TextField
          style={{ fontSize: 14 }}
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
              style={{ fontWeight: "bold", fontSize: 14 }}
            >
              {option.memberName}
            </Typography>
          </Grid>
        </Grid>
      )}
    />
  );
}
