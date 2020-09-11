// eslint-disable-next-line
import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  Fragment,
} from "react";
import { UserContext } from "../constants/UserContext";
import { useAuthEffect } from "../hooks/useAuthEffect";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { watchMessages } from "../utils/firebaseUtils";

import { messageModel } from "../constants/Models";
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

interface MessageBoxProps {
  chatId: string;
}

export default function MessageBox({ chatId }: MessageBoxProps) {
  // Context
  const { user, setUser } = useContext(UserContext);

  const classes = useStyles();

  const [messageArray, setMessageArray] = useState<messageModel[]>([]);

  function isUser(senderID: string) {
    if (user.id === senderID) {
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

  useAuthEffect(() => {
    const unsubscribe = watchMessages(chatId, setMessageArray); // userId is hardcoded for now

    return () => unsubscribe();
  }, [chatId]);

  const lastMessage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastMessage.current !== null) {
      lastMessage.current.scrollIntoView(false);
    }
  }, [messageArray]);

  return (
    <>
      {messageArray.map((thisMessage, index) => {
        const {
          id,
          senderId,
          senderName,
          messageText,
          timestamp,
          senderProfilePic,
        } = thisMessage;

        return (
          <Fragment key={id}>
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
                    alt={senderName}
                    src={senderProfilePic}
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
                    style={{ backgroundColor: theme.palette.primary.main }}
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
          </Fragment>
        );
      })}
      <Grid item ref={lastMessage}></Grid>
    </>
  );
}
