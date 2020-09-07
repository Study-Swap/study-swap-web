/********** IMPORT **********/
import {
  getPosts,
  getUserPosts,
  getFeed,
  addPost,
  removePost,
  editPost,
  addLike,
  removeLike,
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
  addCommentLike,
  removeCommentLike,
} from "./comments";

import {
  getNotifications,
  readNotification,
  sendTrending,
  sendLike,
  sendNewChat,
  sendAdminAccess,
  sendComment,
} from "./notifications";

import {
  watchMessages,
  addMessages,
  getChats,
  addChats,
  addMember,
  leaveChat,
  getMessage,
  watchChats,
  getCurrentChatMembers,
  updateChatName,
} from "./chats";

import {
  addUser,
  loginUser,
  getUser,
  checkDuplicateEmail,
  sendPasswordResetEmail,
  logoutUser,
  addUsersByEmail,
  getUsersForChatCreation,
  editUserSchedule,
  editUser,
  addUsagePoint,
  getClassRoster,
} from "./users";

import { getGraphData } from "./userUsage";

/********** EXPORT **********/
export {
  watchMessages,
  addMessages,
  getChats,
  addChats,
  addMember,
  leaveChat,
  getMessage,
  watchChats,
  getClassList,
  getClasses,
  addClasses,
  removeClasses,
  createClass,
  editClass,
  getComments,
  addComment,
  deleteComment,
  editComment,
  addCommentLike,
  removeCommentLike,
  getNotifications,
  readNotification,
  sendTrending,
  sendLike,
  sendNewChat,
  sendAdminAccess,
  sendComment,
  getPosts,
  getUserPosts,
  getFeed,
  addPost,
  removePost,
  editPost,
  addLike,
  removeLike,
  addUser,
  loginUser,
  getUser,
  checkDuplicateEmail,
  sendPasswordResetEmail,
  logoutUser,
  addUsersByEmail,
  getUsersForChatCreation,
  editUserSchedule,
  editUser,
  addUsagePoint,
  getClassRoster,
  getGraphData,
  getCurrentChatMembers,
  updateChatName,
};
