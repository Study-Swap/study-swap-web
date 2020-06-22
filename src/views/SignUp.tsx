import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

// eslint-disable-next-line
import { addUser, getUser } from "../utils/firebaseUtils";

import history from "../utils/historyUtils";
import { emailValid } from "../utils/emailValidUtils";
import { classesOffered } from "../constants/classesOffered";

export default function SignUp() {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [enrolledClasses, setEnrolledClasses] = useState<string[]>([]);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const emailValidation = () => {
    setEmailError(!emailValid(email));
  };

  const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handlePasswordIcon = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShowPassword(!showPassword);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirm(event.target.value);
    if (event.target.value !== password) {
      // bc setState is slow for some reason
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleClasses = (event: React.ChangeEvent<{ value: unknown }>) => {
    setEnrolledClasses(event.target.value as string[]);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => {
          setShowError(false);
        }}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                value={firstName}
                onChange={handleFirstName}
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={handleLastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={handleEmail}
                onBlur={emailValidation}
                error={emailError}
                helperText={emailError ? "Please use your school email" : ""}
              />
            </Grid>
            <FormControl
              fullWidth
              variant="outlined"
              className={classes.margin}
            >
              <InputLabel
                htmlFor="outlined-adornment-password"
                error={passwordError}
              >
                {"Password *"}
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handlePasswordIcon}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={80}
                error={passwordError}
              />
              <FormHelperText id="password-helper-text">
                {passwordError ? "Passwords do not match" : ""}
              </FormHelperText>
            </FormControl>
            <FormControl
              fullWidth
              variant="outlined"
              className={classes.margin}
            >
              <InputLabel
                htmlFor="outlined-adornment-confirm-password"
                error={passwordError}
              >
                {"Confirm Password *"}
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirm-password"
                type={showPassword ? "text" : "password"}
                value={confirm}
                onChange={handleConfirm}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handlePasswordIcon}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={145}
                error={passwordError}
              />
              <FormHelperText id="confirm-helper-text">
                {passwordError ? "Passwords do not match" : ""}
              </FormHelperText>
            </FormControl>
            <FormControl
              fullWidth
              variant="outlined"
              className={classes.margin}
            >
              <InputLabel id="select-mutiple-classes">
                Select Classes *
              </InputLabel>
              <Select
                labelId="select-mutiple-classes-label"
                id="select-mutiple-classes-id"
                multiple
                value={enrolledClasses}
                onChange={handleClasses}
                input={<OutlinedInput labelWidth={120} />}
                MenuProps={MenuProps}
              >
                {classesOffered.map((class_) => (
                  <MenuItem key={class_.value} value={class_.value}>
                    {class_.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive email notifications"
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={async (): Promise<any> => {
              await addUser(email, password, {
                firstName,
                lastName,
                email,
                classes: enrolledClasses,
                chats: [],
              })
                .then(async () => {
                  await getUser().then((user: any) => {
                    console.log(user);
                    history.push("/home");
                  });
                })
                .catch((err) => {
                  if (err) {
                    setErrorMessage(err);
                    setShowError(true);
                  }
                });
            }}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  margin: {
    margin: theme.spacing(1),
  },
}));
