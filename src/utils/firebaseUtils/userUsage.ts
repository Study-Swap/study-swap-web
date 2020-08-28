// Firebase import
import firebaseApp from "firebase/app";
import firebase from "../../constants/Firebase";

// Constants import
import { collections } from "../../constants/FirebaseStrings";
import { userUsageModel } from "../../constants/Models";

const usageDB = firebase.firestore().collection(collections.userUsage);

interface graphDataType {
  date: string;
  usage: number;
}

function getGraphData(): Promise<graphDataType[]> {
  return usageDB
    .get()
    .then((snapshot: firebaseApp.firestore.QuerySnapshot): graphDataType[] => {
      const graphData: graphDataType[] = [];
      snapshot.forEach((doc): void => {
        const { date, users } = doc.data();
        if (date && users) graphData.unshift({ date, usage: users.length });
      });
      return graphData;
    });
}

export { getGraphData };
