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
  temp: {
    marginVertical: "4px",
  },
}));

export default function ChatSelect(props: any) {
  const classes = useStyles();

  const [messageArray, setMessageArray] = useState<messageModel[]>([]);
  const tempUserId = "7k1MF9w490XOeFH5ygGY";

  function isUser(senderID: string) {
    if (tempUserId === senderID) return "flex-end";
    else return "flex-start";
  }

  useEffect(() => {
    console.log(props.chatId + "messages is loading");
    //ask chintan how to get watchMessages working and async properly
    const unsubscribe = watchMessages("9yWHYYczrMViTQwfG3F7", setMessageArray); // userId is hardcoded for now

    return () => unsubscribe();
    //.catch((err) => console.error(err));
  }, []);

  return (
    <React.Fragment>
      {messageArray.map((thisMessage, index) => {
        const { id, senderId, messageText, timestamp } = thisMessage;
        return (
          <React.Fragment key={id}>
            <Grid container item sm={12} justifyContent={isUser(senderId)}>
              <Grid item>
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  className={classes.media}
                />
              </Grid>

              <Grid item>
                <Card className={classes.textMessage} variant="outlined">
                  <Typography gutterBottom>{messageText}</Typography>
                </Card>
                <Typography variant="caption">{timestamp}</Typography>
              </Grid>
            </Grid>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
}
