import React, { useState, ChangeEvent, MouseEvent } from "react";

import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
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

import { addUser, checkDuplicateEmail } from "../utils/firebaseUtils";
import { emailValid } from "../utils/emailValidUtils";

export default function SignUp() {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [grade, setGrade] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const emailValidation = () => {
    setEmailError(!emailValid(email));
  };

  const handleFirstName = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleLastName = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handlePasswordIcon = (event: MouseEvent<HTMLButtonElement>) => {
    setShowPassword(!showPassword);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirm = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirm(event.target.value);
    if (event.target.value !== password) {
      // bc setState is slow for some reason
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
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
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => {
          setShowSuccess(false);
        }}
      >
        <Alert severity="success">Email Sent!</Alert>
      </Snackbar>
      <div className={classes.paper}>
        <img
          src={require("../constants/Class_Logos/Company.png")}
          alt="Website Logo"
          style={{ height: 118.2, padding: 3, width: 322.8 }}
        />
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
              variant="outlined"
              fullWidth
              className={classes.margin}
            >
              <InputLabel id="demo-mutiple-name-label">Grade</InputLabel>
              <Select
                labelId="grade-select-label"
                id="demo-simple-select"
                inputProps={{
                  id: "demo-mutiple-name-label",
                }}
                label="Grade"
                value={grade}
                onChange={(event: ChangeEvent<{ value: unknown }>) => {
                  setGrade(event.target.value as string);
                }}
              >
                <MenuItem value={"Freshman"}>Freshman</MenuItem>
                <MenuItem value={"Sophomore"}>Sophomore</MenuItem>
                <MenuItem value={"Junior"}>Junior</MenuItem>
                <MenuItem value={"Senior"}>Senior</MenuItem>
              </Select>
            </FormControl>
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
            disabled={
              !(
                firstName.length > 0 &&
                lastName.length > 0 &&
                !emailError &&
                !passwordError &&
                grade.length > 0 &&
                password.length > 0
              )
            }
            onClick={async (): Promise<any> => {
              const methods = await checkDuplicateEmail(email);
              if (methods.length === 0) {
                await addUser(email, password, {
                  firstName,
                  lastName,
                  email,
                  classes: ["1"],
                  classNames: [],
                  chats: [],
                  signedUp: true,
                  grade,
                })
                  .then(() => {
                    setShowSuccess(true);
                  })
                  .catch((err) => {
                    if (err) {
                      setErrorMessage(err);
                      setShowError(true);
                    }
                  });
              } else {
                setErrorMessage("This email is already in use");
                setShowError(true);
              }
            }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
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
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  margin: {
    margin: theme.spacing(1),
  },
}));
