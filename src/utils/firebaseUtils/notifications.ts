import firebase from "../../constants/Firebase";
import { notificationTypes } from "../../constants/types/notificationTypes";
import { collections } from "../../constants/FirebaseStrings";
import { notificationModel } from "../../constants/Models";
var functions = firebase.functions();
// Base function, will be wrapped below
var sendNotification = functions.httpsCallable("sendNotification");

// Makes code cleaner
const notificationsDB = firebase
  .firestore()
  .collection(collections.notifications);

/*
@type     GET -> Notifications
@desc     get all notifications for a certain userId
*/
function getNotifications(userId: string): Promise<any> {
  console.log("getting notifications");
  return notificationsDB
    .where("userId", "==", userId)
    .orderBy("timestamp", "asc")
    .get()
    .then(
      (snapShot: any): Array<notificationModel> => {
        const notifications: Array<notificationModel> = [];
        snapShot.forEach((notification: any): void => {
          const data = notification.data();
          notifications.unshift({
            userId: data.userId,
            senderId: data.senderId,
            senderName: data.senderName,
            notificationText: data.notificationText,
            id: notification.id,
            read: data.read,
            kind: data.kind, // will be a little different once db is populated
            timestamp: data.timestamp.toDate().toDateString(),
          });
        });
        console.log(notifications);
        return notifications;
      }
    )
    .catch((error) => {
      return Promise.reject(error.message);
    });
}

/*
  @type     PATCH -> Notifications
  @desc     read notification
  */
function readNotification(notificationId: string): void {
  notificationsDB
    .doc(notificationId)
    .update({ read: true })
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
}

interface notificationDataType {
  userId: string;
  senderName: string;
  notificationText: string;
  profilePicture: string;
}

// Different types asre verbose, but make it easier to know what you are sending and when
function sendTrending(notificationData: notificationDataType) {
  const {
    userId,
    senderName,
    notificationText,
    profilePicture,
  } = notificationData;
  sendNotification({
    userId,
    senderName,
    notificationText,
    profilePicture,
    kind: notificationTypes.TRENDING_POST,
  }).then(() => {
    console.log("notification sent");
  });
}

function sendLike(notificationData: notificationDataType) {
  const {
    userId,
    senderName,
    notificationText,
    profilePicture,
  } = notificationData;
  sendNotification({
    userId,
    senderName,
    notificationText,
    profilePicture,
    kind: notificationTypes.LIKE,
  }).then(() => {
    console.log("notification sent");
  });
}

function sendComment(notificationData: notificationDataType) {
  const {
    userId,
    senderName,
    notificationText,
    profilePicture,
  } = notificationData;
  sendNotification({
    userId,
    senderName,
    notificationText,
    profilePicture,
    kind: notificationTypes.COMMENT,
  }).then(() => {
    console.log("notification sent");
  });
}

function sendNewChat(notificationData: notificationDataType) {
  const {
    profilePicture,
    userId,
    senderName,
    notificationText,
  } = notificationData;
  sendNotification({
    userId,
    senderName,
    notificationText,
    profilePicture,
    kind: notificationTypes.NEW_CHAT,
  }).then(() => {
    console.log("notification sent");
  });
}

function sendAdminAccess(notificationData: notificationDataType) {
  const {
    profilePicture,
    userId,
    senderName,
    notificationText,
  } = notificationData;
  sendNotification({
    userId,
    senderName,
    notificationText,
    profilePicture,
    kind: notificationTypes.ADMIN_ACCESS,
  }).then(() => {
    console.log("notification sent");
  });
}

export {
  getNotifications,
  readNotification,
  sendTrending,
  sendLike,
  sendNewChat,
  sendAdminAccess,
  sendComment,
};
