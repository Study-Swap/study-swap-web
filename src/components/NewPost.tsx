import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    height: 200,
    maxWidth: 500,
  },
  input: {
    marginLeft: theme.spacing(2),
    flex: 1,
    overflow: "auto",
  },
  iconButton: {
    padding: 10,
  },
}));

const options = ["Choose class", "EECS 183", "BIO 172", "ENGR 100"];

export default function CustomizedInputBase(props: any) {
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleChange = (event: any) => {
    setValue(event.target.value);
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
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {options[selectedIndex]}
      </Button>
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
        onChange={handleChange}
      />
      <IconButton
        //type="submit"
        className={classes.iconButton}
        aria-label="Send"
        onClick={() => {
          props.onClick({
            //id?: string;
            // foreign key relations
            userId: "temp",
            classId: "1",
            // post specific
            postText: value,
            postUserName: "Ashish Mahuli",
            postClassName: options[selectedIndex],
            //timestamp?: any;
            edited: false,
          });
          setValue("");
        }}
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
}
