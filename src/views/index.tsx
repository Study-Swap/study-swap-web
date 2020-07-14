import React from "react";

// Icon Imports
import {
  HomeRounded as HomeIcon,
  MessageRounded as ChatIcon,
} from "@material-ui/icons";

// View Component Imports
import Login from "./Login";
import Home from "./Home";
import Chats from "./Chats";
import Profile from "./Profile";
import SignUp from "./SignUp";
import NotLoggedIn from "./NotLoggedIn";
import PasswordReset from "./PasswordReset";
import AdminDashboard from "./AdminDashboard";
import AdminSignUp from "./AdminSignUp";

// Array of arrays in format "Name", ComponentIcon, "/route"
export const menuList = [
  ["Home", <HomeIcon></HomeIcon>, "/home"],
  ["Chats", <ChatIcon></ChatIcon>, "/chats"],
];

interface RouteType {
  path: string;
  component: any;
}
export const routes: Array<RouteType> = [
  { path: "/login", component: Login },
  { path: "/home", component: Home },
  { path: "/chats", component: Chats },
  { path: "/profile", component: Profile },
  { path: "/signup", component: SignUp },
  { path: "/signup/admin", component: AdminSignUp },
  { path: "/dashboard", component: AdminDashboard },
  { path: "/not-logged-in", component: NotLoggedIn },
  { path: "/reset-password", component: PasswordReset },
];
