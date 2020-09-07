import { useEffect } from "react";
import history from "../utils/historyUtils";
import firebase from "../constants/Firebase";

export function useAuthEffect(
  effectFunction: Function,
  dependancyArray: any[]
) {
  useEffect(() => {
    if (firebase.auth().currentUser) {
      console.log("using auth divider");
      effectFunction();
    } else {
      history.push("/not-logged-in");
    }
  }, dependancyArray);
}
