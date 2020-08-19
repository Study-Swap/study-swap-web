import React, { createContext } from "react";
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
  };
  setUser: React.Dispatch<
    React.SetStateAction<{
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
  },
  setUser: () => {},
};

export const UserContext = createContext(initialState);
