import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../constants/UserContext";
import { useAuthEffect } from "../hooks/useAuthEffect";

import Grid from "@material-ui/core/Grid";

import NewPost from "../components/NewPost";
import FeedItem from "../components/FeedItem";

import { getPosts, addPost } from "../utils/firebaseUtils";
import { postModel } from "../constants/Models";

interface FeedProps {
  categoryFilter: any;
}

export default function Feed({ categoryFilter }: FeedProps) {
  // Context
  const { user, setUser } = useContext(UserContext);

  const [postState, setPostState] = useState<any[]>([]);

  useAuthEffect(() => {
    getPosts("1") // classId is hardcoded for now
      .then((res) => {
        setPostState(res);
      })
      .catch((err) => console.error(err));
  }, []); // TODO: Add loading indicator and put "refresh" into empty array

  function isInToShow(post: postModel) {
    var toShow = true;
    try {
      toShow = categoryFilter[post.postCategory];
    } catch (error) {
      console.error(error);
    }
    return toShow;
  }
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
      <Grid item>
        <NewPost
          onClick={(post: postModel) => {
            addPost(post.userId, post.classId, post).then((result: any) => {
              setPostState([
                { id: result.id, timestamp: result.timestamp, ...post },
                ...postState,
              ]);
            });
          }}
        />
      </Grid>
      {postState
        .filter((post) => isInToShow(post))
        .map((thisPost, index) => {
          var isLiked;
          thisPost.likedBy.indexOf(user.id) !== -1
            ? (isLiked = true)
            : (isLiked = false);
          return (
            <Grid item key={thisPost.id} style={{ width: "500px" }}>
              <FeedItem
                id={thisPost.id}
                userId={thisPost.userId}
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
              />
            </Grid>
          );
        })}
    </Grid>
  );
}
