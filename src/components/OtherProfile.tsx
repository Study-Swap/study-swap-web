import React, { useState, useEffect } from "react";
import { useAuthEffect } from "../hooks/useAuthEffect";

import ViewProfile from "../components/ViewProfile2";
import Scheduler from "../components/Scheduler";
import UserFeed from "../components/UserFeed";

import { getUser } from "../utils/firebaseUtils";
import { userModel } from "../constants/Models";

interface OtherProfileProps {
  userId: string;
}

export default function OtherProfile({ userId }: OtherProfileProps) {
  const [user, setUser] = useState<userModel | null>();

  useAuthEffect(() => {
    getUser(userId).then((res) => {
      setUser(res);
    });
  }, []);

  if (user) {
    return (
      <>
        <ViewProfile
          firstName={user.firstName}
          lastName={user.lastName}
          grade={user.grade ? user.grade : ""}
          bio={user.bio ? user.bio : ""}
          classIds={user.classes}
          classNames={user.classNames}
          profilePicture={user.profilePicture ? user.profilePicture : ""}
        />
        <Scheduler
          timeStrings={user.schedule ? user.schedule : []}
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
