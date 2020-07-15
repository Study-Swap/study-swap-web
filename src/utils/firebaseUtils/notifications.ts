import firebase from "../../constants/Firebase";

import { notificationTypes } from "../../constants/notificationTypes";
import { collections } from "../../constants/FirebaseStrings";
import { notificationModel } from "../../constants/Models";

// Makes code cleaner
const notificationsDB = firebase
  .firestore()
  .collection(collections.notifications);

/*
@type     GET -> Notifications
@desc     get all notifications for a certain userId
*/
function getNotifications(userId: string): Promise<any> {
  return notificationsDB
    .where("userId", "==", userId)
    .orderBy("timestamp", "asc")
    .get()
    .then(
      (snapShot: any): Array<notificationModel> => {
        const notifications: Array<notificationModel> = [];
        snapShot.forEach((notification: any): void => {
          const data = notification.data();
          notifications.push({
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

export { getNotifications, readNotification };
