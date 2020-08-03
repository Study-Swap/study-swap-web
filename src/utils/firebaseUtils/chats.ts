import firebaseApp from "firebase/app";
import firebase from "../../constants/Firebase";

import { collections } from "../../constants/FirebaseStrings";
import { chatsModel, messageModel } from "../../constants/Models";

// Makes code cleaner
const messagesDB = firebase.firestore().collection(collections.messages);
const chatsDB = firebase.firestore().collection(collections.chats);
const usersDB = firebase.firestore().collection(collections.users);

/*
  @type     GET -> Messages
  @desc     watch all messages that belong to a chat -> return on change
*/
function watchMessages(chatId: string, setMessages: Function): any {
  //TODO Fix any return....
  return messagesDB
    .where("chatId", "==", chatId)
    .orderBy("timestamp", "desc")
    .onSnapshot((querySnapshot: any): void => {
      const messages: Array<messageModel> = [];
      querySnapshot.forEach((message: any): void => {
        const data = message.data();
        messages.push({
          id: message.id,
          chatId: data.chatId,
          messageText: data.messageText,
          senderId: data.senderId,
          senderName: data.senderName,
          timestamp: data.timestamp,
        });
      });
      setMessages(messages);
    });
}

/*
  @type     POST -> Messages
  @desc     add new message
*/
function addMessages(message: messageModel): void {
  messagesDB.add({
    timestamp: firebaseApp.firestore.FieldValue.serverTimestamp(),
    ...message,
  });
}

/*
  @type     GET -> Chats
  @desc     get user chats
*/
function getChats(userId: string): Promise<any> {
  return chatsDB
    .where("members", "array-contains", userId)
    .get()
    .then(
      (snapshot): Array<chatsModel> => {
        const chats: Array<chatsModel> = [];
        snapshot.forEach((chat): void => {
          const data = chat.data();
          chats.push({
            id: chat.id,
            chatName: data.chatName,
            members: data.members,
            memberNames: data.memberNames,
            messages: data.messages,
          });
        });
        return chats;
      }
    )
    .catch((err) => {
      console.log(err);
    });
}

/*
  @type     POST -> Chats
  @desc     add new chat
*/
function addChats(userId: string, recepientId: string): any {
  //TODO Fix any return....
  // Make new chat
  chatsDB
    .add({
      members: [userId, recepientId],
      messages: [],
    })
    .then((chat: any): void => {
      // Then add chat to users chat list
      usersDB
        .doc(userId)
        .update({
          chats: firebaseApp.firestore.FieldValue.arrayUnion(chat.id),
        })
        .catch((err: any): void => {
          console.error(err); // will be changed to redirect to error screen
        });
      usersDB
        .doc(recepientId)
        .update({
          chats: firebaseApp.firestore.FieldValue.arrayUnion(chat.id),
        })
        .catch((err: any): void => {
          console.error(err); // will be changed to redirect to error screen
        });
    })
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
}

/*
  @type     POST -> Chats
  @desc     add new member to chat
*/
function addMember(memberId: string, chatId: string): any {
  //TODO Fix any return....
  const ref = chatsDB.doc(chatId);
  // Add memberId to member array
  ref
    .update({
      members: firebaseApp.firestore.FieldValue.arrayUnion(memberId),
    })
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
  // Add chatId to new members chats array
  ref
    .get()
    .then((chat: any): void => {
      usersDB
        .doc(memberId)
        .update({ chats: firebaseApp.firestore.FieldValue.arrayUnion(chat.id) })
        .catch((err: any): void => {
          console.error(err); // will be changed to redirect to error screen
        });
    })
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
}

/*
  @type     PATCH -> Chats
  @desc     remove member from chat
*/
function leaveChat(memberId: string, chatId: string): any {
  //TODO Fix any return....
  const ref = chatsDB.doc(chatId);
  // Delete memberId from member array
  ref
    .update({
      members: firebaseApp.firestore.FieldValue.arrayRemove(memberId),
    })
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
  // Remove chatId from old members chats array
  ref
    .get()
    .then((chat: any): void => {
      usersDB
        .doc(memberId)
        .update({
          chats: firebaseApp.firestore.FieldValue.arrayRemove(chat.id),
        })
        .catch((err: any): void => {
          console.error(err); // will be changed to redirect to error screen
        });
    })
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
}

export { watchMessages, addMessages, getChats, addChats, addMember, leaveChat };
