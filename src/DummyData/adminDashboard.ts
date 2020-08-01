import { recentActivityTypes } from "../constants/types/recentActivityTypes";

export const dummyClassList = [
  { name: "Chintan Modi", email: "cmodi@umich.edu" },
  { name: "Chintan Modi", email: "cmodi@umich.edu" },
  { name: "Chintan Modi", email: "cmodi@umich.edu" },
  { name: "Chintan Modi", email: "cmodi@umich.edu" },
  { name: "Chintan Modi", email: "cmodi@umich.edu" },
  { name: "Chintan Modi", email: "cmodi@umich.edu" },
  { name: "Chintan Modi", email: "cmodi@umich.edu" },
  { name: "Chintan Modi", email: "cmodi@umich.edu" },
];

export const dummyChartData = [
  { date: "6/1/2020", usage: 0 },
  { date: "6/2/2020", usage: 100 },
  { date: "6/3/2020", usage: 250 },
  { date: "6/4/2020", usage: 300 },
  { date: "6/5/2020", usage: 150 },
  { date: "6/6/2020", usage: 175 },
  { date: "6/7/2020", usage: 200 },
  { date: "6/8/2020", usage: 180 },
];

export const dummyUnreadMessages = [
  {
    senderName: "Chintan Modi",
    subject: "Hello",
    messageText: "I need help with this question",
  },
  {
    senderName: "Akul Vijayvargiya",
    subject: "Hi",
    messageText: "When are office hours this week?",
  },
  {
    senderName: "Ashish Mahulli",
    subject: "Hey",
    messageText: "Can I be on a team for the next project",
  },
  {
    senderName: "Chintan Modi",
    subject: "Hello",
    messageText: "I need help with this question",
  },
  {
    senderName: "Akul Vijayvargiya",
    subject: "Hi",
    messageText: "When are office hours this week?",
  },
  {
    senderName: "Ashish Mahulli",
    subject: "Hey",
    messageText: "Can I be on a team for the next project",
  },
];

export const dummyRecentActivity = [
  {
    id: "1",
    modelPointer: "N/A",
    subject: "Trending Post from Ashish",
    data: "This assingment is so cool!",
    type: recentActivityTypes.TRENDING_POST,
  },
  {
    id: "2",
    modelPointer: "N/A",
    subject: "Trending Comment from Akul",
    data: "Stop bro its kinda wack",
    type: recentActivityTypes.TRENDING_COMMENT,
  },
  {
    id: "3",
    modelPointer: "N/A",
    subject: "Potential Honor Code Violation from Chintan",
    data: "Lets cheat on it ;)",
    type: recentActivityTypes.POTENTIAL_HONOR_CODE,
  },
];
