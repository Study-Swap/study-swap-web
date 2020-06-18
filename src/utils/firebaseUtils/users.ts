import firebaseApp from "firebase/app";
import firebase from "../../constants/Firebase";

import { collections } from "../../constants/FirebaseStrings";
import { userModel } from "../../constants/Models";

const db = firebase.firestore();

async function addUser(
  email: string,
  password: string,
  userInfo: userModel
): Promise<void> {
  const { firstName, lastName, classes, chats } = userInfo;
  await firebaseApp
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((): void => {
      const user = firebaseApp.auth().currentUser;
      if (user) {
        db.collection(collections.users).doc(user.uid).set({
          firstName,
          lastName,
          //grade,
          email,
          //bio,
          classes,
          chats,
        });
      } else {
        throw Error;
      }
    })
    .catch((err: any): void => {
      console.log(err);
    });
}

async function loginUser(email: string, password: string): Promise<void> {
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      const user = firebaseApp.auth().currentUser;
      if (user) {
        db.collection(collections.users)
          .doc(user.uid)
          .get()
          .then(
            (user: any): userModel => {
              console.log({ ...user.data(), id: user.id });
              return { ...user.data(), id: user.id };
            }
          );
      } else {
        throw Error;
      }
    })
    .catch((err: any): void => {
      console.log(err);
    });
}

export { addUser, loginUser };
