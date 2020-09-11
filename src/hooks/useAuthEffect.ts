import { useEffect } from "react";
import history from "../utils/historyUtils";
import firebase from "../constants/Firebase";

export function useAuthEffect(
  effectFunction: Function,
  dependancyArray: any[],
  isChats?: boolean
) {
  useEffect(() => {
    if (firebase.auth().currentUser) {
      effectFunction();
    } else {
      setTimeout(
        () => {
          if (firebase.auth().currentUser) {
            effectFunction();
          } else {
            history.push("/not-logged-in");
          }
        },
        isChats ? 2000 : 1000
      );
    }
  }, dependancyArray);
}
