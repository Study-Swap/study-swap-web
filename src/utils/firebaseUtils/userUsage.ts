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
  console.log("getting user graph data");
  return usageDB
    .orderBy("timestamp", "desc")
    .get()
    .then((snapshot: firebaseApp.firestore.QuerySnapshot): graphDataType[] => {
      const graphData: graphDataType[] = [];
      snapshot.forEach((doc): void => {
        console.log(doc.data());
        const { date, users } = doc.data();
        let newDate = new Date(date);
        if (newDate && users)
          graphData.unshift({
            date: newDate.toLocaleDateString(),
            usage: users.length,
          });
      });
      return graphData;
    });
}

export { getGraphData };
