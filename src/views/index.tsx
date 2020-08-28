import React from "react";

// Icon Imports
import {
  HomeRounded as HomeIcon,
  MessageRounded as ChatIcon,
  ClassRounded as ClassIcon,
} from "@material-ui/icons";

// View Component Imports
import Login from "./Login";
import Class from "./Class";
import Home from "./Home";
import Chats from "./Chats";
import Profile from "./Profile";
import SignUp from "./SignUp";
import NotLoggedIn from "./NotLoggedIn";
import PasswordReset from "./PasswordReset";
import AdminDashboard from "./AdminDashboard";
import Help from "./Help";
import HelpReqd from "./HelpReqd";

// Array of arrays in format "Name", ComponentIcon, "/route"
export const menuList = [
  ["Home", <HomeIcon></HomeIcon>, "/home"],
  ["Chats", <ChatIcon></ChatIcon>, "/chats"],
  ["Classes", <ClassIcon></ClassIcon>, "./classes"],
];

interface RouteType {
  path: string;
  component: any;
}
export const routes: Array<RouteType> = [
  { path: "/help", component: Help },
  { path: "/requested-help", component: HelpReqd },
  { path: "/login", component: Login },
  { path: "/chats", component: Chats },
  { path: "/profile", component: Profile },
  { path: "/classes", component: Class },
  { path: "/signup", component: SignUp },
  { path: "/dashboard", component: AdminDashboard },
  { path: "/not-logged-in", component: NotLoggedIn },
  { path: "/reset-password", component: PasswordReset },
  { path: "/home", component: Home },
];
