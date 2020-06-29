import React, { createContext } from "react";
interface initState {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    classes: string[];
    chats: string[];
  };
  setUser: React.Dispatch<
    React.SetStateAction<{
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      classes: string[];
      chats: string[];
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
  },
  setUser: () => {},
};

export const UserContext = createContext(initialState);
