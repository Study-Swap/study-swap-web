import { chatsModel } from "../constants/Models";
import { messageModel } from "../constants/Models";
export const dummyChatsData: Array<chatsModel> = [
  {
    id: "1",
    chatName: "Chat 1",
    members: ["12", "23"],
    memberNames: ["Chintan Modi", "Ashish Mahuli"],
    messages: [],
  },
  {
    id: "2",
    chatName: "Chat 2",
    members: ["12", "56"],
    memberNames: ["Chintan Modi", "Nick Smith"],
    messages: [],
  },
  {
    id: "3",
    chatName: "Chat 3",
    members: ["12", "34"],
    memberNames: ["Chintan Modi", "Akul Vijayvargiya"],
    messages: [],
  },
  {
    id: "4",
    chatName: "Chat 4",
    members: ["12", "23", "34"],
    memberNames: ["Chintan Modi", "Ashish Mahuli", "Akul Vijayvargiya"],
    messages: [],
  },
];

export const dummyMessagesData: Array<messageModel> = [
  {
    id: "1",
    chatId: "4",
    messageText: "This is a test message",
    senderId: "12",
    senderName: "Ashish",
    timestamp: "June 12 2019",
  },

  {
    id: "1",
    chatId: "6",
    messageText: "This is another message",
    senderId: "12",
    senderName: "Akul",
    timestamp: "June 12 2019",
  },

  {
    id: "1",
    chatId: "4",
    messageText: "This is a final message",
    senderId: "12",
    senderName: "Ashish",
    timestamp: "June 12 2019",
  },
];
