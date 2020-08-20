import React from "react";
import firebase from "../../constants/Firebase";
const storage = firebase.storage();

/*
EXAMPLE ON HOW TO USE IMAGES
*********************************************
State Vars:
const [imageAsFile, setImageAsFile] = useState<File>();
const [imageAsUrl, setImageAsUrl] = useState<string>("");
const [base64String, setBase64String] = useState<string>("");

Inside React Code:
<form onSubmit={(e: any) => {
  e.preventDefault();
  if (imageAsFile) {
    firebaseUploadImageFile(imageAsFile, setImageAsUrl);
  }
}}>
    <input
        className={classes.picInput}
        id="change-image"
        type="file"
        onChange={(e: any) => {
            e.preventDefault();
            const image: File = e.target.files[0];
            getImageBase64String(image, setBase64String)
            setImageFile(image, setImageAsFile)
        }}
    />
    <label htmlFor="change-image">
        <Avatar
        className={classes.media}
        alt="Prof Pic"
        src={imageAsUrl or base64String} depends on use case
        />
    </label>
    <Button type="submit">upload</Button>
</form>

*/

const getImageBase64String = (
  image: File,
  setBase64String: React.Dispatch<React.SetStateAction<string>>
) => {
  var reader = new FileReader();
  reader.onload = function () {
    const imageString = reader.result?.toString();
    if (imageString) setBase64String(imageString);
  };
  reader.readAsDataURL(image);
};

const setImageFile = (
  image: File,
  setImageAsFile: React.Dispatch<React.SetStateAction<File>>
) => {
  setImageAsFile(image);
};

const firebaseUploadImageFile = (
  fileName: string,
  imageFile: File,
  setImageAsUrl: React.Dispatch<React.SetStateAction<string>>
) => {
  storage
    .ref(`/images/profileImages/${fileName}`)
    .put(imageFile)
    .then(() => {
      storage
        .ref(`/images/profileImages`)
        .child(fileName)
        .getDownloadURL()
        .then((fireBaseUrl) => {
          setImageAsUrl(fireBaseUrl);
        });
    });
};

/* 
Non Example functions 
***************************************************
*/

enum folderEnums {
  PROFILE_FOLDER,
  POST_FOLDER,
  CHAT_FOLDER,
}

const folders = ["profileImages", "postImages", "chatImages"];

function uploadImage(
  type: folderEnums, // Must be one of the enums
  fileName: string,
  image: File // get from e.target.files[0];
): void {
  storage.ref(`/images/${folders[type]}/${fileName}`).put(image);
}

function getImageURI(
  type: folderEnums, // Must be one of the enums
  fileName: string
): Promise<string> {
  return storage
    .ref(`/images/${folders[type]}`)
    .child(fileName)
    .getDownloadURL()
    .then((fireBaseUrl: string) => {
      return fireBaseUrl;
    });
}

function makeProfilePicName(firstName: string, lastName: string): string {
  return `${firstName}_${lastName}_Profile_Picture`;
}

function makeChatPostPicName(userId: string): string {
  return `${userId}__${Math.random() * 10000000}`;
}

// Will upload an image and then return the uri
// (used in chat and profile to add the uri to the model)
function uploadAndString(
  type: folderEnums, // Must be one of the enums
  fileName: string,
  image: File // get from e.target.files[0];
): Promise<string> {
  return storage
    .ref(`/images/${folders[type]}/${fileName}`)
    .put(image)
    .then(() => {
      return storage
        .ref(`/images/${folders[type]}`)
        .child(fileName)
        .getDownloadURL()
        .then((fireBaseUrl: string) => {
          return fireBaseUrl;
        });
    });
}
