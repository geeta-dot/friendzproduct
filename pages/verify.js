import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../src/Layout";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import {
  commonStyles,
  desktopStyles,
  mobileStyles,
  TabStyles,
} from "../src/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import MuiAlert from "@material-ui/lab/Alert";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { setMessages } from "../src/redux/actions/messages";
import Router from "next/router";
import { verifyEmail } from "../src/apis/auth-api";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  ...commonStyles,
  [theme.breakpoints.up("md")]: desktopStyles,
  [theme.breakpoints.between("sm", "md")]: TabStyles,
  [theme.breakpoints.down("sm")]: mobileStyles,
}));

function VerifyEmail({ query }) {
  const classes = useStyles();

  const [message, setmessage] = useState("");
  const [messageType, setmessageType] = useState("");
  const [backdrop, setbackdrop] = useState(true);

  useEffect(() => {
    let { token } = query;
    if (!token) {
      setbackdrop(false);
      setmessageType("error");
      setmessage("Token is not valid");
      Router.push("/");
      return;
    }
    verifyEmail(token).then((data) => {
      setmessageType(data.error ? "error" : "success");
      setbackdrop(false);
      setmessage(data.msg);
      let userData = localStorage.getItem("user");
      userData = userData ? JSON.parse(userData) : "";
      if (userData) {
        userData.email_verified_at = true;
        localStorage.setItem("user", JSON.stringify(userData));
      }
      setTimeout(() => {
        window.location.replace("/profile/edit");
      }, 1000);
    });
  }, [query]);

  return (
    <Layout>
      <section style={{ textAlign: "center", minWidth: 275 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Email Verification
            </Typography>

            {message && (
              <Alert
                severity={messageType}
                style={{ width: 300, margin: "auto" }}
              >
                {message}
              </Alert>
            )}
            {backdrop && (
              <Backdrop
                className={classes.backdrop}
                open={backdrop}
                // onClick={handleClose}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            )}
          </CardContent>
          {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Card>
      </section>
    </Layout>
  );
}
VerifyEmail.getInitialProps = ({ query }) => {
  return { query };
};

export default VerifyEmail;
