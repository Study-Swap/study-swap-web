// Firebase import
import firebaseApp from "firebase/app";
import firebase from "../../constants/Firebase";

// Constants import
import { collections } from "../../constants/FirebaseStrings";
import { userModel } from "../../constants/Models";

const db = firebase.firestore();

var actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be whitelisted in the Firebase Console.
  url: "http://localhost:3000/login",
  // This must be true.
  handleCodeInApp: true,
};

function sendEmail(email: string) {
  firebase
    .auth()
    .sendSignInLinkToEmail(email, actionCodeSettings)
    .then(function () {
      console.log("email sent");
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      window.localStorage.setItem("emailForSignIn", email);
    })
    .catch(function (error) {
      // Some error occurred, you can inspect the code: error.code
      console.log(error);
    });
}

async function checkDuplicateEmail(email: string) {
  return firebase.auth().fetchSignInMethodsForEmail(email);
}

function sendPasswordResetEmail(email: string) {
  return firebaseApp
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      return "Email Sent!";
    })
    .catch((error) => {
      return Promise.reject(error.message);
    });
}

async function addUser(
  email: string,
  password: string,
  userInfo: userModel
): Promise<any> {
  const { firstName, lastName, classes, chats } = userInfo;
  await firebaseApp
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((): any => {
      const user = firebaseApp.auth().currentUser;
      if (user) {
        return db.collection(collections.users).doc(user.uid).set({
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
    .catch(
      (err: any): Promise<any> => {
        return Promise.reject(err.message);
      }
    );
}

function getUser(): any {
  const user = firebaseApp.auth().currentUser;
  if (user) {
    return db
      .collection(collections.users)
      .doc(user.uid)
      .get()
      .then(
        (dbUser: any): userModel => {
          return { id: user.uid, ...dbUser.data() };
        }
      );
  }
}

async function loginUser(email: string, password: string): Promise<void> {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      const user = firebaseApp.auth().currentUser;
      if (user) {
        return db
          .collection(collections.users)
          .doc(user.uid)
          .get()
          .then(
            (dbUser: any): userModel => {
              return { ...dbUser.data(), id: user.uid };
            }
          );
      } else {
        throw Error;
      }
    })
    .catch(
      (err: any): Promise<any> => {
        return Promise.reject(err.message);
      }
    );
}

export {
  addUser,
  loginUser,
  getUser,
  sendEmail,
  checkDuplicateEmail,
  sendPasswordResetEmail,
};
