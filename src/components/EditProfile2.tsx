// eslint-disable-next-line
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../constants/UserContext";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ComputerIcon from "@material-ui/icons/Computer";
import SaveIcon from "@material-ui/icons/Save";
import Link from "@material-ui/core/Link";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { userModel } from "../constants/Models";
import { dummyUser } from "../DummyData/profile";
import firebase from "../constants/Firebase";

// eslint-disable-next-line
import history from "../utils/historyUtils";
import { logoutUser } from "../utils/firebaseUtils";
import { NONAME, AnyRecordWithTtl } from "dns";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  pos: {
    fontSize: 20,
    marginBottom: 10,
  },
  media: {
    height: "70%",
    width: "100%",
  },
  picInput: {
    display: "none",
  },
  inputBio: {
    height: 150,
    width: 150,
  },
  input: {
    //marginLeft: theme.spacing(2),
    flex: 1,
    overflow: "auto",
    fontSize: 14,
    width: "100%",
  },
  userInfo: {
    marginLeft: 20,
    dislpay: "flex",
    flexDirection: "column",
  },
  button: {
    height: 40,
    marginRight: 3,
  },
});

interface imageAsFileType {
  name: string;
  lastModified: any;
  lastModifiedDate: any;
  size: any;
  type: any;
  webkitRelativePath: any;
}

export default function EditProfile({
  bio,
  firstName,
  lastName,
  grade,
  setEditing,
  setUser,
  classIds,
  classNames,
}: any) {
  // eslint-disable-next-line
  const storage = firebase.storage();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [bioInput, setBioInput] = useState(bio);
  const [firstInput, setFirstInput] = useState(firstName);
  const [lastInput, setLastInput] = useState(lastName);
  const [gradeInput, setGradeInput] = useState(grade);
  const [imageAsFile, setImageAsFile] = useState<File>();
  const [imageAsUrl, setImageAsUrl] = useState("");
  const [base64String, setBase64String] = useState<string>("");

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

  const handleImageAsFile = async (e: any) => {
    const image: File = e.target.files[0];

    setImageAsFile(image);
  };

  const firebaseUploadImageFile = (imageFile: File) => {
    storage
      .ref(`/images/profileImages/${imageFile.name}`)
      .put(imageFile)
      .then(() => {
        storage
          .ref(`/images/profileImages`)
          .child(imageFile.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            console.log(fireBaseUrl);
            setImageAsUrl(fireBaseUrl);
          });
      });
  };

  const handleFireBaseUpload = (e: any) => {
    e.preventDefault();
    if (imageAsFile) {
      firebaseUploadImageFile(imageAsFile);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid container item xs={9}>
            <Grid container item direction="row" alignItems="flex-start">
              <Grid item xs={3}>
                <Avatar
                  className={classes.media}
                  alt="Prof Pic"
                  src={require("../components/apoorv.png")}
                />
              </Grid>
              <Grid item xs={9}>
                <div className={classes.userInfo}>
                  <div>
                    <TextField id="name" label="Outlined" variant="outlined" />
                  </div>
                  <div>
                    <TextField id="grade" label="Outlined" variant="outlined" />
                  </div>
                  <div>
                    <TextField id="bio" label="Outlined" variant="outlined" />
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item xs={3} direction="column" alignItems="flex-end">
            <Grid item></Grid>
            <br />
            {classNames.map((name: string, index: number) => {
              return (
                <Grid item>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-end",
                    }}
                  >
                    <ComputerIcon />
                    <Link
                      href={`/class/${classIds[index]}`}
                      style={{ fontSize: 15, marginRight: 30, marginLeft: 5 }}
                    >
                      {name}
                    </Link>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
