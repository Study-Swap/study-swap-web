// eslint-disable-next-line
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../constants/UserContext";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ImageIcon from "@material-ui/icons/Image";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

// eslint-disable-next-line
import history from "../utils/historyUtils";
import { dummyMessagesData1, dummyMessagesData2 } from "../DummyData/chats";
import { StringifyOptions } from "querystring";
import { ExecOptionsWithStringEncoding } from "child_process";
import { messageModel } from "../constants/Models";
import WriteMessage from "../components/WriteMessage";

const useStyles = makeStyles((theme) => ({
  textMessage: {
    width: "100%",
  },

  inline: {
    display: "inline",
  },
  hover: {
    "&:hover": {
      backgroundColor: "#D3D3D3 !important",
    },
  },
  media: {
    height: "30px",
    width: "30px",
  },
}));

export default function ChatSelect(props: any) {
  useEffect(() => {
    if (props.chatId == "1") {
      setMessageArray(dummyMessagesData1);
    } else if (props.chatId == "2") {
      setMessageArray(dummyMessagesData2);
    }
  }); //if you want to only run on first render, add [] as second arg
  //https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once

  const classes = useStyles();

  const [messageArray, setMessageArray] = useState<messageModel[]>(
    dummyMessagesData1
  );
  const userID = "12";

  function isUser(senderID: string) {
    if (userID === senderID) return "flex-end";
    else return "flex-start";
  }

  return (
    <React.Fragment>
      {messageArray.map((thisMessage, index) => (
        <Grid container item sm={12} justify={isUser(thisMessage.senderId)}>
          <Grid item>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              className={classes.media}
            />
          </Grid>

          <Grid item>
            <Card className={classes.textMessage} variant="outlined">
              <Typography gutterBottom>{thisMessage.messageText}</Typography>
            </Card>
            <Typography variant="caption">{thisMessage.timestamp}</Typography>
          </Grid>
        </Grid>
      ))}
    </React.Fragment>
  );
}
