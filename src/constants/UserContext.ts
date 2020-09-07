import React, { createContext, Dispatch, SetStateAction } from "react";
interface initState {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    classes: string[];
    chats: string[];
    bio: string;
    schedule: string[];
    grade: string;
    classNames: Array<string>;
    profilePicture: string;
    isAdmin: string;
  };
  setUser: Dispatch<
    SetStateAction<{
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      classes: string[];
      chats: string[];
      bio: string;
      schedule: string[];
      grade: string;
      classNames: Array<string>;
      profilePicture: string;
      isAdmin: string;
    }>
  >;
}
const initialState: initState = {
  user: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    classes: [""],
    chats: [""],
    schedule: [],
    bio: "",
    grade: "Junior",
    classNames: [],
    profilePicture: "",
    isAdmin: "",
  },
  setUser: () => {},
};

export const UserContext = createContext(initialState);
