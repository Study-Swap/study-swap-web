// eslint-disable-next-line
import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../constants/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { watchMessages } from "../utils/firebaseUtils";

// eslint-disable-next-line
import history from "../utils/historyUtils";
import { dummyMessagesData1, dummyMessagesData2 } from "../DummyData/chats";
import { messageModel } from "../constants/Models";
import CardContent from "@material-ui/core/CardContent";
import { theme } from "../constants/theme";

const useStyles = makeStyles((theme) => ({
  textMessageLeft: {
    borderRadius: "10px",
    minwidth: "10px",
    maxWidth: "250px",
    marginLeft: "5px",
  },
  textMessageRight: {
    borderRadius: "10px",
    minwidth: "10px",
    maxWidth: "250px",
  },

  textOnly: {
    paddingTop: "3px",
    paddingBottom: "3px",
    paddingLeft: "6px",
    paddingRight: "6px",
    fontSize: 14,
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
    height: "25px",
    width: "25px",
  },
  messageContainer: {
    //marginVertical: "4px",
    paddingTop: "6px",
    paddingLeft: "6px",
    paddingRight: "6px",
    paddingBottom: "6px",
  },
}));

export default function MessageBox(props: any) {
  const classes = useStyles();

  const [messageArray, setMessageArray] = useState<messageModel[]>([]);
  const tempUserId = "7k1MF9w490XOeFH5ygGY";

  function isUser(senderID: string) {
    if (tempUserId === senderID) {
      return true;
    } else return false;
  }

  let lastTimestamp: string | undefined = "";
  function checkTimestamp(timestamp: string | undefined) {
    if (timestamp == lastTimestamp) {
      return false;
    } else {
      lastTimestamp = timestamp;
      return true;
    }
  }
  let lastName: string = "";
  function checkName(senderName: string) {
    if (senderName == lastName) {
      return false;
    } else {
      return true;
    }
  }

  function updateName(senderName: string) {
    if (senderName == lastName) {
      return false;
    } else {
      lastName = senderName;
      return true;
    }
  }

  useEffect(() => {
    console.log(props.chatId + "messages is loading");
    //ask chintan how to get watchMessages working and async properly
    const unsubscribe = watchMessages(props.chatId, setMessageArray); // userId is hardcoded for now

    return () => unsubscribe();
    //.catch((err) => console.error(err));
  }, [props.chatId]);

  const lastMessage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(lastMessage.current);
    if (lastMessage.current !== null) {
      lastMessage.current.scrollIntoView(false);
    }
  }, [messageArray]);

  return (
    <React.Fragment>
      {messageArray.map((thisMessage, index) => {
        const {
          id,
          senderId,
          senderName,
          messageText,
          timestamp,
        } = thisMessage;

        return (
          <React.Fragment key={id}>
            {checkTimestamp(timestamp) ? (
              <Grid
                container
                item
                sm={12}
                justifyContent="center"
                style={{ padding: "12px 0px 12px 0px" }}
              >
                <Grid item>
                  <Typography
                    color="textSecondary"
                    style={{ fontSize: 12, fontWeight: "bold" }}
                  >
                    {timestamp}
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <div></div>
            )}
            {!isUser(senderId) ? (
              <Grid
                container
                item
                sm={12}
                justifyContent="flex-start"
                className={classes.messageContainer}
              >
                <Grid item>
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    className={classes.media}
                    style={{
                      marginTop: checkName(senderName) ? "20px" : "0px",
                    }}
                  />
                </Grid>

                <Grid item>
                  {updateName(senderName) ? (
                    <Typography
                      color="textSecondary"
                      style={{ fontSize: 12, paddingLeft: "10px" }}
                    >
                      {senderName}
                    </Typography>
                  ) : (
                    <div></div>
                  )}

                  <div
                    className={classes.textMessageLeft}
                    style={{ backgroundColor: "#e5e5ea" }}
                  >
                    <Typography className={classes.textOnly}>
                      {messageText}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            ) : (
              <Grid
                container
                item
                sm={12}
                justifyContent="flex-end"
                className={classes.messageContainer}
              >
                {updateName(senderName)}
                <Grid item>
                  <div
                    className={classes.textMessageRight}
                    style={{ backgroundColor: theme.palette.primary.main }} //"#000C76"    //</Grid></Grid>#4bbbfa
                  >
                    <Typography
                      className={classes.textOnly}
                      style={{ color: "#FFFFFF" }}
                    >
                      {messageText}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            )}
          </React.Fragment>
        );
      })}
      <Grid item ref={lastMessage}></Grid>
    </React.Fragment>
  );
}
