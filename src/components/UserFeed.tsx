import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../constants/UserContext";

import Grid from "@material-ui/core/Grid";

import FeedItem from "../components/FeedItem";

import { getUserPosts } from "../utils/firebaseUtils";

interface UserFeedProps {
  userId: string;
}

export default function UserFeed({ userId }: UserFeedProps) {
  // Context
  const { user } = useContext(UserContext);

  const [postState, setPostState] = useState<any[]>([]);

  useEffect(() => {
    getUserPosts(userId)
      .then((res) => {
        if (res) setPostState(res);
      })
      .catch((err) => console.error(err));
  }, []); // TODO: Add loading indicator and put "refresh" into empty array

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={4}
      //className={classes.root}
      style={{ overflow: "auto" }}
    >
      {postState.map((thisPost, index) => {
        var isLiked;
        thisPost.likedBy.indexOf(user.id) !== -1
          ? (isLiked = true)
          : (isLiked = false);
        return (
          <Grid item key={thisPost.id} style={{ width: "500px" }}>
            <FeedItem
              id={thisPost.id}
              postUserName={thisPost.postUserName}
              postClassName={thisPost.postClassName}
              postText={thisPost.postText}
              timestamp={thisPost.timestamp}
              postCategory={thisPost.postCategory}
              edited={thisPost.edited}
              classId={thisPost.classId}
              likedBy={thisPost.likedBy}
              isLiked={isLiked}
              profilePic={thisPost.postUserProfilePic}
              userId={thisPost.userId}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
