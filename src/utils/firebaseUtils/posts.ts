import firebaseApp from "firebase/app";
import firebase from "../../constants/Firebase";

import { collections } from "../../constants/FirebaseStrings";
import { postModel } from "../../constants/Models";

// Makes code cleaner
const postsDB = firebase.firestore().collection(collections.posts);
const usersDB = firebase.firestore().collection(collections.users);
const commentsDB = firebase.firestore().collection(collections.comments);

/*
@type     GET -> Posts
@desc     get all posts in a certain class
*/
function getPosts(classId: string): Promise<any> {
  return postsDB
    .where("classId", "==", classId)
    .orderBy("timestamp", "asc")
    .get()
    .then(
      (snapShot: any): Array<postModel> => {
        const posts: Array<postModel> = [];
        snapShot.forEach((post: any): void => {
          const data = post.data();
          posts.unshift({
            userId: data.userId,
            classId: data.classId,
            postText: data.postText,
            postUserName: data.postUserName,
            postClassName: data.postClassName,
            postCategory: data.postCategory,
            id: post.id,
            edited: false,
            timestamp: data.timestamp.toDate().toDateString(),
            likedBy: data.likedBy,
          });
        });
        return posts;
      }
    )
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
}

/*
  @type     GET -> Posts
  @desc     get all posts made by a certain user
*/
function getUserPosts(userId: string): Promise<postModel[] | void> {
  return postsDB
    .where("userId", "==", userId)
    .orderBy("timestamp", "asc")
    .get()
    .then(
      (snapShot: any): Array<postModel> => {
        const posts: Array<postModel> = [];
        snapShot.forEach((post: any): void => {
          const data = post.data();
          posts.push({
            userId: data.userId,
            classId: data.classId,
            postText: data.postText,
            postUserName: data.postUserName,
            postClassName: data.postClassName,
            postCategory: data.postCategory,
            id: post.id,
            edited: false,
            timestamp: data.timestamp.toDate().toDateString(),
            likedBy: data.likedBy,
          });
        });
        return posts;
      }
    )
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
}

/*
  @type     GET -> Posts
  @desc     get all posts for a certain userId
*/
function getFeed(userId: string): Promise<any> {
  // TODO Later: Fix 'any' in return...
  return usersDB
    .doc(userId)
    .get()
    .then(
      (user: any): Array<postModel[] | void> => {
        const classes: Array<string> = user.data().classes;
        let posts: Array<postModel[] | void> = [];
        classes.forEach(
          async (class_: string): Promise<void> => {
            // For each class concat all of the posts
            const postBlob = getPosts(class_);
            posts = posts.concat(await postBlob);
          }
        );
        return posts;
      }
    )
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
}

/*
  @type     POST -> Posts
  @desc     add a new post into a class, returns the timestamp
*/
function addPost(
  userId: string,
  classId: string,
  post: postModel
): Promise<any> {
  return postsDB
    .add({
      timestamp: firebaseApp.firestore.FieldValue.serverTimestamp(),
      ...post,
    })
    .then((addedPost: any) => {
      return addedPost.id;
    })
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
}

/*
  @type     DELETE -> Posts
  @desc     remove an old post from a class
*/
function removePost(postId: string): void {
  postsDB
    .doc(postId)
    .delete()
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
  commentsDB
    .where("postId", "==", postId)
    .get()
    .then((res: any): void => {
      let batch = firebase.firestore().batch();
      res.forEach((doc: any): void => {
        batch.delete(doc.ref);
      });
      batch.commit().catch((err: any): void => {
        console.error(err); // will be changed to redirect to error screen
      });
    })
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
}

/*
  @type     PATCH -> Posts
  @desc     edit a post with newText
*/
function editPost(postId: string, newText: string): void {
  postsDB
    .doc(postId)
    .update({ postText: newText })
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
}

function addLike(postId: string, userID: string): void {
  postsDB
    .doc(postId)
    .update({ likedBy: firebaseApp.firestore.FieldValue.arrayUnion(userID) })
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
}

function removeLike(postId: string, userID: string): void {
  postsDB
    .doc(postId)
    .update({ likedBy: firebaseApp.firestore.FieldValue.arrayRemove(userID) })
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
}

export {
  getPosts,
  getUserPosts,
  getFeed,
  addPost,
  removePost,
  editPost,
  addLike,
  removeLike,
};
