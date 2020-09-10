import firebaseApp from "firebase/app";
import firebase from "../../constants/Firebase";

import { collections } from "../../constants/FirebaseStrings";
import { chatsModel, messageModel } from "../../constants/Models";
import { nameAndId } from "../../constants/types/rosterTypes";

import { chatAnalytics, messageAnalytics } from "../analyticsUtils";

// Makes code cleaner
const messagesDB = firebase.firestore().collection(collections.messages);
const chatsDB = firebase.firestore().collection(collections.chats);
const usersDB = firebase.firestore().collection(collections.users);

/*
  @type     GET -> Messages
  @desc     watch all messages that belong to a chat -> return on change
*/
function watchMessages(chatId: string, setMessageArray: Function): any {
  console.log("watching messages");
  //TODO Fix any return....
  return messagesDB
    .where("chatId", "==", chatId)
    .orderBy("timestamp", "desc")
    .onSnapshot((querySnapshot: any): void => {
      console.log("in messages snapshot");
      const messages: Array<messageModel> = [];
      querySnapshot.forEach(
        async (message: any): Promise<void> => {
          const data = await message.data({ serverTimestamps: "estimate" });
          messages.unshift({
            id: message.id,
            chatId: data.chatId,
            messageText: data.messageText,
            senderId: data.senderId,
            senderName: data.senderName,
            senderProfilePic: data.senderProfilePic,
            timestamp: data.timestamp
              ? data.timestamp.toDate().toDateString()
              : new Date().toDateString(),
          });
        }
      );
      setTimeout(() => {
        setMessageArray(messages);
      }, 0);
    });
}

function configureDate(timestamp?: any) {
  var currentTime = new Date();

  if (timestamp) {
    console.log(
      currentTime.toDateString() + " ---" + timestamp.toDate().toDateString()
    );
    if (currentTime.toDateString() === timestamp.toDate().toDateString()) {
      return timestamp
        .toDate()
        .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } else {
      console.log(timestamp.toDate().toDateString());
      return timestamp
        .toDate()
        .toLocaleString("default", { month: "short", day: "2-digit" });
    }
  } else {
    return currentTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}

function getDMName(combined: string, userName: string) {
  try {
    let split = combined.split("/");
    if (split[0] == userName) return split[1];
    else if (split[1] == userName) {
      return split[0];
    }
  } catch {
    return combined;
  }
  return combined;
}
/*
  @type     GET -> Messages
  @desc     watch all messages that belong to a chat -> return on change
*/
function watchChats(
  userId: string,
  userName: string,
  setChatArray: Function
): any {
  console.log("watching chats");
  //TODO Fix any return....
  return chatsDB
    .where("members", "array-contains", userId)
    .orderBy("lastMessageTimestamp", "asc")
    .onSnapshot((querySnapshot: any): void => {
      console.log("in chats snapshot");
      const chats: Array<chatsModel> = [];
      querySnapshot.forEach(
        async (chat: any): Promise<void> => {
          const data = await chat.data();
          chats.unshift({
            id: chat.id,
            chatName: data.isGroup
              ? data.chatName
              : getDMName(data.chatName, userName),
            memberNames: data.memberNames,
            members: data.members,
            messages: data.messages,
            lastMessageTimestamp: data.lastMessageTimestamp
              ? configureDate(data.lastMessageTimestamp)
              : configureDate(),
            isGroup: data.isGroup,
          });
        }
      );
      setTimeout(() => {
        console.log(chats);
        setChatArray(chats);
      }, 0);
    });
}

/*
  @type     POST -> Messages
  @desc     add new message
*/
function addMessages(message: messageModel): void {
  messagesDB
    .add({
      timestamp: firebaseApp.firestore.FieldValue.serverTimestamp(),
      ...message,
    })
    .then((res: any) => {
      console.log(res);
      chatsDB
        .doc(message.chatId)
        .update({
          messages: firebaseApp.firestore.FieldValue.arrayUnion(res.id),
        })

        .catch((err: any): void => {
          console.error(err); // will be changed to redirect to error screen
        });
      messageAnalytics(message.messageText, res.id);
    })
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });

  chatsDB.doc(message.chatId).update({
    lastMessageTimestamp: firebaseApp.firestore.FieldValue.serverTimestamp(),
  });
}

/*
  @type     GET -> Chats
  @desc     get user chats
*/

//OUTDATED FUNCTION.  GO TO watchChats().
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
            chatName: data.memberNames[0],
            members: data.members,
            memberNames: data.memberNames,
            messages: data.messages,
            isGroup: data.isGroup,
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
function addChats(newChat: any): any {
  //takes in a chats model
  //TODO Fix any return....
  // Make new chat
  chatsDB
    .add({
      chatName: newChat.chatName,
      members: newChat.members,
      memberNames: newChat.memberNames,
      messages: [],
      lastMessageTimestamp: firebaseApp.firestore.FieldValue.serverTimestamp(),
      isGroup: newChat.isGroup,
    })
    .then((chat: any): void => {
      //console.log(chat.id);

      // Then add chat to users chat list
      newChat.members.forEach((memberId: string) => {
        usersDB
          .doc(memberId)
          .update({
            chats: firebaseApp.firestore.FieldValue.arrayUnion(chat.id),
          })
          .catch((err: any): void => {
            console.error(err); // will be changed to redirect to error screen
          });
      });
      chatAnalytics(newChat.members, chat.id);
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

function getMessage(messageId: string): Promise<any> {
  console.log("get message called");
  return messagesDB
    .doc(messageId)
    .get()
    .then((res: any) => {
      const data = res.data();
      return {
        id: messageId,
        timestamp: data.timestamp,
        messageText: data.messageText,
        senderId: data.senderId,
        senderName: data.senderName,
      };
    })
    .catch((err) => {
      console.log(err);
    });
}

//ENGR100 hardcoded for now, will take in a userModel once we set that up
function getCurrentChatMembers(chatId: any, userId: string): Promise<any> {
  console.log("getting current members " + chatId);
  return usersDB
    .where("chats", "array-contains", chatId)
    .orderBy("firstName", "desc")
    .get()
    .then((users: any) => {
      const toReturn: Array<nameAndId> = [];
      users.forEach((user: any) => {
        const data = user.data();
        if (user.id != userId) {
          toReturn.push({
            memberName: data.firstName + " " + data.lastName,
            memberId: user.id,
            profilePicture: data.profilePicture ? data.profilePicture : "",
          });
        }
      });
      return toReturn;
    })
    .catch((err: any) => {
      console.log(err);
    });
}

function updateChatName(chatId: any, newName: string) {
  const ref = chatsDB.doc(chatId);

  ref
    .update({
      chatName: newName,
    })
    .catch((err: any): void => {
      console.error(err); // will be changed to redirect to error screen
    });
}

function getRecentMessages(
  numDays: number,
  chatList: string[]
): Promise<messageModel[]> {
  var date = new Date();
  date.setDate(date.getDate() - numDays);
  const dayRange = firebaseApp.firestore.Timestamp.fromDate(date);
  return messagesDB
    .where("chatId", "in", chatList.slice(0, 10))
    .where("timestamp", ">=", dayRange)
    .orderBy("timestamp", "asc")
    .get()
    .then((querySnapshot) => {
      const messages: Array<messageModel> = [];
      querySnapshot.forEach(
        async (message: any): Promise<void> => {
          const data = await message.data({ serverTimestamps: "estimate" });
          messages.unshift({
            id: message.id,
            chatId: data.chatId,
            messageText: data.messageText,
            senderId: data.senderId,
            senderName: data.senderName,
            senderProfilePic: data.senderProfilePic,
            timestamp: data.timestamp
              ? data.timestamp.toDate().toDateString()
              : new Date().toDateString(),
          });
        }
      );
      return messages;
    });
}

export {
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
  getRecentMessages,
};
