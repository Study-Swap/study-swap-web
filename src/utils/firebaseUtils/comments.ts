// Firebase import
import firebaseApp from "firebase/app";
import firebase from "../../constants/Firebase";

// Constants import
import { collections } from "../../constants/FirebaseStrings";
import { commentModel } from "../../constants/Models";

import { commentAnalytics } from "../analyticsUtils";

// Makes code cleaner
const commentsDB = firebase.firestore().collection(collections.comments);

/*
@type     GET -> Comments
@desc     get all comments for a certain post
*/
function getComments(postId: string): Promise<any> {
  return commentsDB
    .where("postId", "==", postId)
    .orderBy("timestamp", "desc")
    .get()
    .then(
      (snapshot: any): Array<commentModel> => {
        const comments: Array<commentModel> = [];
        snapshot.forEach((comment: any): void => {
          const data = comment.data();
          comments.unshift({
            id: comment.id,
            userId: data.userId,
            postId: data.postId,
            commenterName: data.commenterName,
            commentText: data.commentText,
            timestamp: data.timestamp.toDate().toDateString(),
            likedBy: data.likedBy,
            commenterProfilePic: data.commenterProfilePic,
          });
        });
        return comments;
      }
    )
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
}

/*
@type     GET -> Comments
@desc     get all comments for a certain post
*/
function getComment(postId: string): Promise<any> {
  return commentsDB
    .where("postId", "==", postId)
    .orderBy("timestamp", "desc")
    .limit(1)
    .get()
    .then(
      (snapshot: any): Array<commentModel> => {
        const comments: Array<commentModel> = [];
        snapshot.forEach((comment: any): void => {
          const data = comment.data();
          comments.unshift({
            id: comment.id,
            userId: data.userId,
            postId: data.postId,
            commenterName: data.commenterName,
            commentText: data.commentText,
            timestamp: data.timestamp.toDate().toDateString(),
            likedBy: data.likedBy,
            commenterProfilePic: data.commenterProfilePic,
          });
        });
        return comments;
      }
    )
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
}

/*
  @type     POST -> Comments
  @desc     add new comment
  */
function addComment(comment: commentModel): Promise<any> {
  return commentsDB
    .add({
      timestamp: firebaseApp.firestore.FieldValue.serverTimestamp(),
      ...comment,
    })
    .then((ref: firebaseApp.firestore.DocumentData): any => {
      const date = new Date();
      commentAnalytics(comment.commentText, ref.id);
      return {
        id: ref.id,
        timestamp: date.toDateString(),
      };
    })
    .catch((err: any): any => {
      console.error(err); // will be changed to redirect to error screen
      return "error";
    });
}

/*
  @type     DELETE -> Comments
  @desc     delete old comment
  */
function deleteComment(commentId: string): void {
  commentsDB
    .doc(commentId)
    .delete()
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
}

/*
  @type     PATCH -> Comments
  @desc     edit old comment
  */
function editComment(commentId: string, newText: string): void {
  commentsDB
    .doc(commentId)
    .update({ commentText: newText })
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
}

function addCommentLike(commentId: string, userId: string): void {
  commentsDB
    .doc(commentId)
    .update({ likedBy: firebaseApp.firestore.FieldValue.arrayUnion(userId) })
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
}

function removeCommentLike(commentId: string, userId: string): void {
  commentsDB
    .doc(commentId)
    .update({ likedBy: firebaseApp.firestore.FieldValue.arrayRemove(userId) })
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
}

export {
  getComments,
  addComment,
  deleteComment,
  editComment,
  addCommentLike,
  removeCommentLike,
  getComment,
};
