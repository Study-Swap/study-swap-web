import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { nameAndId } from "../constants/types/rosterTypes";

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

interface SearchBoxProps {
  onChange: Function;
  options: any[];
  dropDownHeight: string;
  placeholder: string;
}

export default function SearchBox({
  onChange,
  options,
  dropDownHeight,
  placeholder,
}: SearchBoxProps) {
  const classes = useStyles();

  const [value, setValue] = useState<nameAndId | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <Autocomplete
      value={value}
      inputValue={inputValue}
      onChange={(_, newValue: nameAndId | null) => {
        if (newValue != null) {
          onChange(newValue);
          setValue(null);
          setInputValue("");
        }
      }}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      className={classes.root}
      options={options}
      getOptionLabel={(option: nameAndId) => option.memberName}
      fullWidth={true}
      ListboxProps={{
        style: {
          fontSize: 14,
          maxHeight: dropDownHeight,
          overflow: "true",
        },
      }}
      renderInput={(params) => (
        <TextField
          style={{ fontSize: 14 }}
          {...params}
          label={placeholder}
          margin="dense"
        />
      )}
      renderOption={(option) => (
        <Grid container spacing={1}>
          <Grid item>
            <Avatar
              className={classes.media}
              alt="Prof Pic"
              src={option.profilePicture}
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
