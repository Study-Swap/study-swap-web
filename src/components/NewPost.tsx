import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SendIcon from "@material-ui/icons/Send";

import { addPost } from "../utils/firebaseUtils";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    flexDirection: "column",
    maxHeight: 200,
    width: 450,
  },
  input: {
    marginLeft: theme.spacing(2),
    flex: 1,
    overflow: "auto",
  },
  iconButton: {
    padding: 10,
  },
  mainDiv: { display: "flex", flexDirection: "row" },
  bottomRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  lengthLimit: { marginBottom: 8, fontSize: 15, marginRight: 5 },
}));

const options = ["Choose Category", "Announcement", "HW", "Exam", "Project"];

interface newPostProps {
  onClick: Function;
}

export default function NewPost({ onClick }: newPostProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const [len, setLen] = React.useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleChange = (event: any) => {
    if (event.target.value.length <= 300) {
      setValue(event.target.value);
      setLen(event.target.value.length);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: any, index: any) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper component="form" className={classes.root}>
      <div className={classes.mainDiv}>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              disabled={index === 0}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
        <InputBase
          className={classes.input}
          placeholder="Type a post..."
          inputProps={{ "aria-label": "post to feed" }}
          multiline={true}
          rowsMax={7}
          value={value}
          fullWidth
          onChange={handleChange}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="Send"
          disabled={selectedIndex === 0 || len === 0}
          onClick={() => {
            onClick({
              //id?: string;
              // foreign key relations
              userId: "temp",
              classId: "1",
              // post specific
              postText: value,
              postUserName: "Ashish Mahuli",
              postCategory: options[selectedIndex],
              postClassName: "ENGR 100",
              //timestamp?: any;
              edited: false,
            });
            setValue("");
            setLen(0);
            setSelectedIndex(0);
          }}
        >
          <SendIcon />
        </IconButton>
      </div>
      <div className={classes.bottomRow}>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          style={{ marginLeft: 5 }}
        >
          {options[selectedIndex]}
        </Button>
        <div className={classes.lengthLimit}>{len}/300</div>
      </div>
    </Paper>
  );
}
