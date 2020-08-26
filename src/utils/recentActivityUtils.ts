/* 
    Since we cannot schedule function calls, one of us will have to run this function via cli or 
    within the app once or twice a day in order to emulate recent activity being caught. 
*/

import { recentActivityTypes } from "../constants/types/recentActivityTypes";
import { collections } from "../constants/FirebaseStrings";
import firebase from "../constants/Firebase";
import {
  postModel,
  commentModel,
  recentActivityModel,
} from "../constants/Models";
import firebaseApp from "firebase/app";
const postsDB = firebase.firestore().collection(collections.posts);
const commentDB = firebase.firestore().collection(collections.comments);

function findTrendingPost(numDays: number): Promise<recentActivityModel[]> {
  var date = new Date();
  date.setDate(date.getDate() - numDays);
  const dayRange = firebaseApp.firestore.Timestamp.fromDate(date);
  return postsDB
    .where("timestamp", ">=", dayRange)
    .orderBy("timestamp", "asc")
    .get()
    .then((res: firebaseApp.firestore.DocumentData): recentActivityModel[] => {
      const trendingPosts: recentActivityModel[] = [];
      res.forEach((post: any): void => {
        const data: postModel = post.data();
        if (data.likedBy.length > 5)
          trendingPosts.push({
            id: post.id,
            subject: `Trending Post from ${data.postUserName}`,
            data: data.postText,
            type: recentActivityTypes.TRENDING_POST,
            modelPointer: post.id,
          });
      });
      return trendingPosts;
    });
}

function findTrendingComment(numDays: number): Promise<recentActivityModel[]> {
  var date = new Date();
  date.setDate(date.getDate() - numDays);
  const dayRange = firebaseApp.firestore.Timestamp.fromDate(date);
  return commentDB
    .where("timestamp", ">=", dayRange)
    .orderBy("timestamp", "asc")
    .get()
    .then((res: firebaseApp.firestore.DocumentData): recentActivityModel[] => {
      const trendingComments: recentActivityModel[] = [];
      res.forEach((comment: any): void => {
        const data: commentModel = comment.data();
        if (data.likedBy.length > 3)
          trendingComments.push({
            id: comment.id,
            subject: `Trending comment from ${data.commenterName}`,
            data: data.commentText,
            type: recentActivityTypes.TRENDING_COMMENT,
            modelPointer: comment.id,
          });
      });
      return trendingComments;
    });
}

function findPotentialHonorCode(
  numDays: number
): Promise<recentActivityModel[]> {
  var date = new Date();
  date.setDate(date.getDate() - numDays);
  const dayRange = firebaseApp.firestore.Timestamp.fromDate(date);
  const potentialHonorCode: recentActivityModel[] = [];
  commentDB
    .where("timestamp", ">=", dayRange)
    .orderBy("timestamp", "asc")
    .get()
    .then((res: firebaseApp.firestore.DocumentData): any => {
      res.forEach((comment: any): void => {
        const data: commentModel = comment.data();
        if (data.commentText.indexOf("cheat") !== -1)
          potentialHonorCode.push({
            id: comment.id,
            subject: `Trending comment from ${data.commenterName}`,
            data: data.commentText,
            type: recentActivityTypes.TRENDING_COMMENT,
            modelPointer: comment.id,
          });
      });
    });
  postsDB
    .where("timestamp", ">=", dayRange)
    .orderBy("timestamp", "asc")
    .get()
    .then((res: firebaseApp.firestore.DocumentData): any => {
      res.forEach((post: any): void => {
        const data: postModel = post.data();
        if (data.postText.indexOf("cheat") !== -1)
          potentialHonorCode.push({
            id: post.id,
            subject: `Trending Post from ${data.postUserName}`,
            data: data.postText,
            type: recentActivityTypes.TRENDING_POST,
            modelPointer: post.id,
          });
      });
    });
  return new Promise(() => potentialHonorCode);
}

export async function createRecentActivity(
  numDays: number
): Promise<recentActivityModel[]> {
  const trendingPosts = await findTrendingPost(numDays);
  const trendingComments = await findTrendingComment(numDays);
  const honorCode = await findPotentialHonorCode(numDays);

  return [...trendingPosts, ...trendingComments, ...honorCode];
}
