import React, { useState, useContext } from "react";
import { useAuthEffect } from "../hooks/useAuthEffect";
import { UserContext } from "../constants/UserContext";

import ViewProfile from "../components/ViewProfile2";
import Scheduler from "../components/Scheduler";
import UserFeed from "../components/UserFeed";

import history from "../utils/historyUtils";
import { getUser, addChats } from "../utils/firebaseUtils";
import { userModel } from "../constants/Models";

interface OtherProfileProps {
  userId: string;
}

export default function OtherProfile({ userId }: OtherProfileProps) {
  const { user } = useContext(UserContext);
  const [otherUser, setUser] = useState<userModel | null>();

  useAuthEffect(() => {
    getUser(userId).then((res) => {
      setUser(res);
    });
  }, []);

  const messagingClick = () => {
    addChats({
      chatName: "",
      members: [userId, user.id],
      memberNames: [
        `${user.firstName} ${user.lastName}`,
        `${otherUser?.firstName} ${otherUser?.lastName}`,
      ],
    });
    history.push("/chats");
  };

  if (otherUser) {
    return (
      <>
        <ViewProfile
          firstName={otherUser.firstName}
          lastName={otherUser.lastName}
          grade={otherUser.grade ? otherUser.grade : ""}
          bio={otherUser.bio ? otherUser.bio : ""}
          classIds={otherUser.classes}
          classNames={otherUser.classNames}
          profilePicture={
            otherUser.profilePicture ? otherUser.profilePicture : ""
          }
          messagingClick={messagingClick}
        />
        <Scheduler
          timeStrings={otherUser.schedule ? otherUser.schedule : []}
          isUser={false}
        />
        <br />
        <UserFeed userId={userId} />
      </>
    );
  } else {
    return <div />;
  }
}
