import { notificationTypes } from "./types/notificationTypes";
import { recentActivityTypes } from "./types/recentActivityTypes";

export interface userModel {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  grade?: string;
  bio?: string;
  classes: Array<string>;
  classNames: Array<string>;
  chats: Array<string>;
  signedUp?: boolean;
  profilePicture?: string; // will be firebase uri
}

export interface classModel {
  id?: string;
  className: string;
  classDescription: string;
  classPicture?: string; // will be firebase uri
}

export interface postModel {
  id?: string;

  // foreign key relations
  userId: string; // points to post-er
  classId: string; // points to class post belongs to
  likedBy: Array<string>;
  // post specific
  postText: string;
  postUserName: string;
  postClassName: string;
  postCategory: string;
  timestamp?: any;
  edited: boolean;
  attachPicture?: string; // will be firebase uri
}

export interface commentModel {
  id?: string;

  // foreign key relations
  userId: string;
  postId: string;
  likedBy: Array<string>;
  // comment specific
  commenterName: string;
  timestamp?: any;
  commentText: string;
}

export interface notificationModel {
  id?: string;

  // foreign key relations
  userId: string; // points to user
  senderId: string; // points to sender of notification

  // notification specific
  kind: notificationTypes; // Type of notif -> enum
  senderName: string;
  notificationText: string;
  timestamp?: any;
  read: boolean;
  imageURI?: any; // image uri so we do not have to load sender profile
}

export interface chatsModel {
  id?: string;
  chatName?: string;
  //foreign key relations
  members: Array<string>; // array of userIds of members
  memberNames: Array<string>; //array of names of members
  // chats specific
  messages: Array<string>; // array of messageIds
}

export interface messageModel {
  id?: string;

  //foreign key relations
  chatId: string; // points to the chat containing the message

  // message specific
  messageText: string;
  senderId: string;
  senderName: string;
  timestamp?: string;
  attachPicture?: string; // will be firebase uri
}

export interface recentActivityModel {
  id?: string;

  //foreign key relations
  modelPointer: string; // ID that points to some other model depending on type

  //activity specific
  subject: string;
  data: string;
  type: recentActivityTypes;
}
