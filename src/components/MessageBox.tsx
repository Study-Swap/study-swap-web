// eslint-disable-next-line
import React, { useState, useEffect, useContext } from "react";
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

const useStyles = makeStyles((theme) => ({
  textMessage: {
    borderRadius: "10px",
    minwidth: "10px",
    maxWidth: "200px",
  },

  textOnly: {
    paddingTop: "6px",
    paddingBottom: "6px",
    paddingLeft: "6px",
    paddingRight: "6px",
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

  useEffect(() => {
    console.log(props.chatId + "messages is loading");
    //ask chintan how to get watchMessages working and async properly
    const unsubscribe = watchMessages(props.chatId, setMessageArray); // userId is hardcoded for now

    return () => unsubscribe();
    //.catch((err) => console.error(err));
  }, [props.chatId]);

  return (
    <React.Fragment>
      {messageArray.map((thisMessage, index) => {
        const { id, senderId, messageText, timestamp } = thisMessage;
        return (
          <React.Fragment key={id}>
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
                  />
                </Grid>

                <Grid item>
                  <div
                    className={classes.textMessage}
                    style={{ backgroundColor: "#d1d1d1" }}
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
                <Grid item>
                  <div
                    className={classes.textMessage}
                    style={{ backgroundColor: "blue" }}
                  >
                    <Typography
                      className={classes.textOnly}
                      style={{ color: "#F8F8F8" }}
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
    </React.Fragment>
  );
}
