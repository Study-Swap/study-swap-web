/********** IMPORT **********/
import {
  getPosts,
  getUserPosts,
  getFeed,
  addPost,
  removePost,
  editPost,
} from "./posts";

import {
  getClassList,
  getClasses,
  addClasses,
  removeClasses,
  createClass,
  editClass,
} from "./classes";

import {
  getComments,
  addComment,
  deleteComment,
  editComment,
} from "./comments";

import {
  getNotifications,
  readNotification,
  sendTrending,
  sendLikeComment,
  sendNewChat,
  sendAdminAccess,
} from "./notifications";

import {
  watchMessages,
  addMessages,
  getChats,
  addChats,
  addMember,
  leaveChat,
} from "./chats";

import {
  addUser,
  loginUser,
  getUser,
  checkDuplicateEmail,
  sendPasswordResetEmail,
  logoutUser,
  addUsersByEmail,
  editUserSchedule,
  editUser,
} from "./users";

/********** EXPORT **********/
export {
  getPosts,
  getUserPosts,
  getFeed,
  addPost,
  removePost,
  editPost,
  getClassList,
  getClasses,
  addClasses,
  removeClasses,
  createClass,
  getComments,
  addComment,
  deleteComment,
  editComment,
  getNotifications,
  readNotification,
  watchMessages,
  addMessages,
  getChats,
  addChats,
  addMember,
  leaveChat,
  addUser,
  loginUser,
  getUser,
  checkDuplicateEmail,
  sendPasswordResetEmail,
  logoutUser,
  addUsersByEmail,
  sendTrending,
  sendLikeComment,
  sendNewChat,
  sendAdminAccess,
  editUserSchedule,
  editUser,
  editClass,
};
