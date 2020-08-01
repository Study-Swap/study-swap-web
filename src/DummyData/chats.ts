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

export const dummyMessagesData1: Array<messageModel> = [
  {
    id: "1",
    chatId: "1",
    messageText: "This is a test message",
    senderId: "12",
    senderName: "Ashish",
    timestamp: "June 12 2019",
  },

  {
    id: "1",
    chatId: "1",
    messageText: "This is another message",
    senderId: "11",
    senderName: "Akul",
    timestamp: "June 13 2019",
  },

  {
    id: "1",
    chatId: "1",
    messageText: "This is a final message",
    senderId: "12",
    senderName: "Ashish",
    timestamp: "June 14 2019",
  },

  {
    id: "1",
    chatId: "1",
    messageText: "This is a final message",
    senderId: "12",
    senderName: "Ashish",
    timestamp: "June 14 2019",
  },

  {
    id: "1",
    chatId: "1",
    messageText: "This is a test message",
    senderId: "12",
    senderName: "Ashish",
    timestamp: "June 12 2019",
  },

  {
    id: "1",
    chatId: "1",
    messageText: "This is another message",
    senderId: "11",
    senderName: "Akul",
    timestamp: "June 13 2019",
  },

  {
    id: "1",
    chatId: "1",
    messageText: "This is a final message",
    senderId: "12",
    senderName: "Ashish",
    timestamp: "June 14 2019",
  },
];

export const dummyMessagesData2: Array<messageModel> = [
  {
    id: "1",
    chatId: "2",
    messageText: "This is an alternate message",
    senderId: "12",
    senderName: "Ashish",
    timestamp: "June 12 2019",
  },

  {
    id: "1",
    chatId: "2",
    messageText: "This is more messages",
    senderId: "11",
    senderName: "Akul",
    timestamp: "June 14 2019",
  },

  {
    id: "1",
    chatId: "2",
    messageText: "This is click test",
    senderId: "12",
    senderName: "Ashish",
    timestamp: "June 16 2019",
  },
];
