import { postModel } from "../constants/Models";
import { commentModel } from "../constants/Models";

export let postData: postModel[] = [
  {
    postUserName: "Ashish Mahuli",
    postClassName: "EECS 281",
    postText: "This is test post #1",
    postCategory: "Announcement",
    timestamp: "Tuesday at 5:33 PM",
    edited: false,
    userId: "0000",
    classId: "1111",
    likedBy: ["0000", "1111", "2222"],
  },
  {
    postUserName: "Akul Vijay",
    postClassName: "EECS 280",
    postText: "This is test post #2",
    timestamp: "Tuesday at 6:33 PM",
    edited: false,
    postCategory: "Exam",
    userId: "0000",
    classId: "1111",
    likedBy: ["0000", "1111", "2222"],
  },
];

export let commentData: commentModel[] = [
  {
    id: "104",
    // foreign key relations
    userId: "amahuli",
    postId: "Post1",
    // comment specific
    commenterName: "Chintan Modi",
    timestamp: "tuesday..",
    commentText: "This is my first comment!",
    likedBy: [],
  },
  {
    id: "104",
    // foreign key relations
    userId: "amahuli",
    postId: "Post1",
    // comment specific
    commenterName: "Chintan Modi",
    timestamp: "tuesday..",
    commentText:
      "This is my first comment! This is a commentText with more text to see how it renders when it is much longer than the first one",
    likedBy: [],
  },
  {
    id: "104",
    // foreign key relations
    userId: "amahuli",
    postId: "Post1",
    // comment specific
    commenterName: "Chintan Modi",
    timestamp: "tuesday..",
    commentText: "This is my first comment!",
    likedBy: [],
  },
  {
    id: "104",
    // foreign key relations
    userId: "amahuli",
    postId: "Post1",
    // comment specific
    commenterName: "Chintan Modi",
    timestamp: "tuesday..",
    commentText:
      "This is my first comment! This is a commentText with more text to see how it renders when it is much longer than the first one",
    likedBy: [],
  },
];
