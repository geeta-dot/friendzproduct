import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../Layout";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import EditProfile from "../components/EditProfile";
import SellerProfile from "../components/SellerProfile";
import Modal from "../components/Modal";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  commonStyles,
  desktopStyles,
  mobileStyles,
  TabStyles,
} from "../styles";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  ...commonStyles,
  [theme.breakpoints.up("md")]: desktopStyles,
  [theme.breakpoints.between("sm", "md")]: TabStyles,
  [theme.breakpoints.down("sm")]: mobileStyles,
}));

export default function ProfilePage({ user, loading = false, edit = false, requests, events, favevents, favproducts, resetPwd }) {
  //   const router = useRouter();

  //   const accessToken = useSelector((state) => state.auth_user.accessToken);
  //   const user = useSelector((state) => state.auth_user.user);

  //   useEffect(() => {
  //     if (!accessToken) {
  //       router.push("/");
  //     }
  //   }, []);
  const classes = useStyles();

  return (
    <Layout>
      {loading && (
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      {!loading && edit && <EditProfile user={user} />}

      {/* <Modal /> */}
      {!loading && !edit && <SellerProfile user={user} requests={requests} events={events} favevents={favevents} favproducts={favproducts} resetPwd={resetPwd} />}
    </Layout>
  );
}
