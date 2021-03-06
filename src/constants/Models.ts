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
  schedule?: string[];
  profilePicture?: string; // will be firebase uri
  isAdmin?: string;
}

export interface classModel {
  id?: string;
  classTitle: string;
  classTime: string;
  classSection: string;
  profName: string;
  gsiName: string;
  iaNames: string;
  canvasLink: string;
  emailLink: string;
  classWebsiteLink: string;
  classPicture?: string; // will be firebase uri
  hasRoster?: boolean;
}

export interface postModel {
  id?: string;

  // foreign key relations
  userId: string; // points to post-er
  classId: string; // points to class post belongs to
  // post specific
  postText: string;
  postUserName: string;
  postUserProfilePic: string;
  postClassName: string;
  postCategory: string;
  timestamp?: any;
  edited: boolean;
  attachPicture?: string; // will be firebase uri
  likedBy: string[];
}

export interface commentModel {
  id?: string;

  // foreign key relations
  userId: string;
  postId: string;
  // comment specific
  commenterName: string;
  commenterProfilePic: string;
  timestamp?: any;
  commentText: string;
  likedBy: string[];
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
  lastMessageTimestamp?: string;
  chatPicture?: string;
  isGroup: boolean;
}

export interface messageModel {
  id?: string;

  //foreign key relations
  chatId: string; // points to the chat containing the message

  // message specific
  messageText: string;
  senderId: string;
  senderName: string;
  senderProfilePic: string;
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

export interface helpModel {
  name: string;
  email: string;
  description: string;
}

export interface userUsageModel {
  date: string;
  users: string[]; // array of user Ids, gets marked whenever a user does something on the app
}
