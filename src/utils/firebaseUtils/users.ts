// Firebase import
import firebaseApp from "firebase/app";
import firebase from "../../constants/Firebase";

// Constants import
import { collections } from "../../constants/FirebaseStrings";
import { userModel, userUsageModel } from "../../constants/Models";

const userDB = firebase.firestore().collection(collections.users);
const usageDB = firebase.firestore().collection(collections.userUsage);

var actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be whitelisted in the Firebase Console.
  url: "http://localhost:3000/login",
  // This must be true.
  handleCodeInApp: true,
};

async function checkDuplicateEmail(email: string) {
  return firebase.auth().fetchSignInMethodsForEmail(email);
}

function sendPasswordResetEmail(email: string): Promise<string> {
  return firebaseApp
    .auth()
    .sendPasswordResetEmail(email)
    .then((): string => {
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
        // actionCodeSettings make the email link redirect to login
        user.sendEmailVerification(actionCodeSettings);
        userDB
          .doc(email)
          .get()
          .then((doc) => {
            // Code got super messy, will fix later
            if (doc.exists) {
              // If there is a doc that exists before hand take the enrolled classes
              let classes_ = [];
              const data = doc.data();
              if (data) {
                classes_ = data.classes;
              }
              return userDB
                .doc(user.uid)
                .set({
                  firstName,
                  lastName,
                  //grade,
                  email,
                  //bio,
                  classes_,
                  chats,
                  signedUp: true,
                  schedule: [],
                })
                .then(() => {
                  // To make sure they validate email
                  firebaseApp.auth().signOut();
                  userDB.doc(email).delete(); // delete temp account
                });
            } else {
              return userDB
                .doc(user.uid)
                .set({
                  firstName,
                  lastName,
                  grade: "Junior",
                  email,
                  bio: "",
                  classes,
                  chats,
                  signedUp: true,
                  schedule: [],
                  classNames: ["EECS 281", "EECS 376"],
                })
                .then(() => {
                  // To make sure they validate email
                  firebaseApp.auth().signOut();
                });
            }
          });
      } else {
        throw Error;
      }
    })
    .catch(
      (err: any): Promise<string> => {
        return Promise.reject(err.message);
      }
    );
}

function getUser(userId: string): Promise<userModel> {
  return userDB
    .doc(userId)
    .get()
    .then(
      (dbUser: any): userModel => {
        return { id: userId, ...dbUser.data() };
      }
    );
}

async function loginUser(email: string, password: string): Promise<any> {
  return (
    firebase
      .auth()
      // User is logged in until tab closed
      .setPersistence(firebaseApp.auth.Auth.Persistence.SESSION)
      .then(
        (): Promise<string | userModel> => {
          return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(
              (): Promise<userModel> => {
                const user = firebaseApp.auth().currentUser;
                if (user?.emailVerified) {
                  return userDB
                    .doc(user.uid)
                    .get()
                    .then(
                      (dbUser: any): userModel => {
                        return { ...dbUser.data(), id: user.uid };
                      }
                    );
                } else {
                  throw Error("User Email not Verified");
                }
              }
            )
            .catch(
              (err: any): Promise<string> => {
                return Promise.reject(err.message);
              }
            );
        }
      )
  );
}

function logoutUser(setUser: Function): Promise<string> {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      setUser({
        // To make sure context does not deceive us
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        classes: [""],
        chats: [""],
        schedule: [],
      });
      return "Logged Out";
    });
}

function addUsersByEmail(
  classId: string,
  emailList: Array<string>,
  fullNames: string[][]
): Promise<any> {
  return Promise.all(
    emailList.map((email: string, index: number) => {
      return userDB
        .where("email", "==", email)
        .get()
        .then((res) => {
          if (res.empty) {
            // If empty make a blank user
            userDB.doc(email).set({
              email: email,
              classes: [classId],
              signedUp: false,
              firstName: fullNames[index][0],
              lastName: fullNames[index][1],
            });
          } else {
            userDB.doc(res.docs[0].id).update({
              classes: firebaseApp.firestore.FieldValue.arrayUnion(classId),
            });
          }
          return "success";
        });
    })
  );
}

function editUserSchedule(timeStrings: string[], userId: string): void {
  userDB.doc(userId).update({
    schedule: timeStrings,
  });
}

function editUser(user: userModel): void {
  userDB.doc(user.id).update({
    ...user,
  });
}

interface nameAndId {
  memberName: string;
  memberId: string;
}

//ENGR100 hardcoded for now, will take in a userModel once we set that up
function getUsersForChatCreation(/*user:userModel*/): Promise<any> {
  return userDB
    .where("classes", "array-contains", "1")
    .orderBy("firstName")
    .get()
    .then((users: any) => {
      const toReturn: Array<nameAndId> = [];
      users.forEach((user: any) => {
        toReturn.push({
          memberName: user.data().firstName + " " + user.data().lastName,
          memberId: user.id,
        });
      });
      return toReturn;
    })
    .catch((err: any) => {
      console.log(err);
    });
}

function getClassRoster(classId: string): Promise<any> {
  return userDB
    .where("classes", "array-contains", classId)
    .get()
    .then((snapshot) => {
      const classRoster: any[] = [];
      snapshot.forEach((user) => {
        const { firstName, lastName, email, profilePicture } = user.data();
        classRoster.push({
          name: `${firstName} ${lastName}`,
          email,
          profilePicture: profilePicture ? profilePicture : "",
        });
      });
      return classRoster;
    });
}

function addUsagePoint(userId: string): void {
  const date = new Date();
  usageDB
    .where("date", "==", date.toDateString())
    .get()
    .then((model: firebaseApp.firestore.DocumentData): void => {
      if (model.empty) {
        usageDB.add({ date: date.toDateString(), users: [userId] });
      } else {
        usageDB.doc(model.docs[0].id).update({
          users: firebaseApp.firestore.FieldValue.arrayUnion(userId),
        });
      }
    });
}

export {
  addUser,
  loginUser,
  getUser,
  checkDuplicateEmail,
  sendPasswordResetEmail,
  logoutUser,
  addUsersByEmail,
  getUsersForChatCreation,
  editUserSchedule,
  editUser,
  addUsagePoint,
  getClassRoster,
};
