import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import Snackbar from "@material-ui/core/Snackbar";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Alert from "@material-ui/lab/Alert";

import { emailValid } from "../utils/emailValidUtils";
import { sendPasswordResetEmail } from "../utils/firebaseUtils";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function PasswordReset() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [returnMessage, setReturnMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [returnErrorMessage, setReturnErrorMessage] = useState("");

  const emailValidation = () => {
    setEmailError(!emailValid(email));
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.container}>
        <Snackbar
          open={showSuccess}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => {
            setShowSuccess(false);
          }}
        >
          <Alert severity="success">{returnMessage}</Alert>
        </Snackbar>
        <Snackbar
          open={showError}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => {
            setShowError(false);
          }}
        >
          <Alert severity="error">{returnErrorMessage}</Alert>
        </Snackbar>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Enter Your Email Address"
            name="email"
            value={email}
            onChange={handleEmail}
            onBlur={emailValidation}
            error={emailError}
            helperText={emailError ? "Please use your school email" : ""}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(): any => {
              sendPasswordResetEmail(email)
                .then((message) => {
                  setReturnMessage(message);
                  setShowSuccess(true);
                })
                .catch((err) => {
                  setReturnErrorMessage(err.message);
                  setShowError(true);
                });
            }}
          >
            Send Reset Email
          </Button>
        </form>
        <Grid item>
          <Link href="/login" variant="body2">
            Done resetting your password? Sign In!
          </Link>
        </Grid>
      </div>
    </Container>
  );
}
